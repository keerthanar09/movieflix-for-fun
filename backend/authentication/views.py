from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .serializers import UserRegistrationSerializer, UserLoginSerializer
from .models import User


@api_view(['POST'])
def register(request):
    """
    Register a new user
    """
    serializer = UserRegistrationSerializer(data=request.data)
    
    if serializer.is_valid():
        # Check if username already exists
        if User.objects.filter(username=serializer.validated_data['username']).exists():
            return Response(
                {'error': 'Username already exists'},
                status=status.HTTP_400_BAD_REQUEST
            )
        
        # Check if userid already exists
        if User.objects.filter(userid=serializer.validated_data['userid']).exists():
            return Response(
                {'error': 'User ID already exists'},
                status=status.HTTP_400_BAD_REQUEST
            )
        
        # Check if email already exists
        if User.objects.filter(email=serializer.validated_data['email']).exists():
            return Response(
                {'error': 'Email already exists'},
                status=status.HTTP_400_BAD_REQUEST
            )
        
        user = serializer.save()
        return Response(
            {
                'message': 'User registered successfully',
                'user': {
                    'username': user.username,
                    'userid': user.userid,
                    'email': user.email
                }
            },
            status=status.HTTP_201_CREATED
        )
    
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['POST'])
def login(request):
    """
    Login user
    """
    serializer = UserLoginSerializer(data=request.data)
    
    if serializer.is_valid():
        username = serializer.validated_data['username']
        password = serializer.validated_data['password']
        
        try:
            user = User.objects.get(username=username)
        except User.DoesNotExist:
            return Response(
                {'error': 'Invalid username or password'},
                status=status.HTTP_401_UNAUTHORIZED
            )
        
        if user.check_password(password):
            return Response(
                {
                    'message': 'Login successful',
                    'user': {
                        'username': user.username,
                        'userid': user.userid,
                        'email': user.email
                    },
                    'redirect_url': 'https://movieflixx.lovable.app/'
                },
                status=status.HTTP_200_OK
            )
        else:
            return Response(
                {'error': 'Invalid username or password'},
                status=status.HTTP_401_UNAUTHORIZED
            )
    
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

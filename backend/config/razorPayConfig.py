import razorpay
from config.env import ENVConfig

RazorPayClient = razorpay.Client(auth=(ENVConfig.RAZORPAY_KEY_ID, ENVConfig.RAZORPAY_KEY_SECRET))
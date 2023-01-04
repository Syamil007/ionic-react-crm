const baseUrl = "http://fnb.test:8000";



 export default baseUrl;

 export const api = {

    //auth
   auth_api : "/api/auth/token",
   subscription : "/api/staff/subscriptions/subscriptions",
   features : "/api/staff/subscriptions/features",
   packages : "/api/staff/subscriptions/packages",
   customer : "/api/staff/customers/customers",
   tenures  : "/api/staff/subscriptions/tenures",
   pay_method : "/api/staff/subscriptions/payment_methods",
   billing : "/api/staff/subscriptions/billings",
   payments :"/api/staff/subscriptions/payments",
 };

 export const web = {
    signIn : "",
 };
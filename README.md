# UKM HUB
![UKMHUB](ukmhub.png?raw=true "Optional Title")

UKMHUB web app create a bridge between corporate and SME's (Small & Medium Enterprises) with the same category in google map view.
Corporate can see the details of UKM and vice versa. Create buy request and sell request to integrate both of them for Indonesia's UKM
better future

# END POINT

## Corporate

| END POINT                                 | METHOD | DESCRIPTION                                             
|-------------------------------------------|--------|--------------------------------------------------
| /auth/register                            | POST   | Add new company email & password with validation
| /auth/login                               | POST   | Company login with JWT Token                     
| /api/company/:id                          | PUT    | Complete company profile                         
| /api/company/:id/buyRequest               | PUT    | create new buy request ( corp only )             
| /api/company/:id/sellRequest              | PUT    | create new sell request ( ukm only )             
| /api/company/:id/:requestId               | PUT    | change status buy request ( corp only )                
| /api/company/:id/:otherId/:requestId/message| PUT  | create new message                     
| /api/company/:id                          | GET    | get detail one company                           
| /api/company/:id/searchByCategory         | GET    | get all company by type           
| /api/company/:id/searchRequest            | GET    | get request  (show buy request for ukm only, and show sell for corporate )                 


## Cooperation

| END POINT                 | METHOD | DESCRIPTION                                             
|---------------------------|--------|-----------------------------------------------
| /api/coop/login           | POST   | login coop to generate jwt                                                            
| /api/coop/verify/:id      | PUT    | update company verify to true                    
| /api/company/             | GET    | get all company list fill verify at front end    
| /api/coop/unverify/:id    | PUT    | Set Status company to unverified                  


# User Stories

## Corporate

1.  Corporate must first register using their company email and password, after registration the user will redirected to the update company profile page. If the update succeeded then the user must be verified first by the coop before using the app (assuming the user has been approved by admin cooperative)

2. Corporate verified by admin cooperatives can use the search feature of SMEs about the same in accordance with the corporate category. SMEs are listed in map view and a list view which enables corporate to see the details of SMEs

3. Corporate can create request that is to demand to make purchases or anything that can be seen by SMEs around them, the request can be responded by SMEs by sending a letter of offer.

4. Corporate can send a respond to requests from SMEs request list, and they will receive an email confirmation to accept or decline the offer.

## SME's (Small & Medium Enterprises)

1. User (SMEs) must first register using their company email and password, after registration the user will be redirected to the update company profile page. If the update succeeded then the user must be verified first by the coop before using the app (assuming the user has been approved by admin cooperative). These step is similar to corporate only the difference in type of company.

2. SMEs that have been verified by admin cooperative can use the search feature approximately the same in accordance with the SME category. Search map view and list view helping SMEs to see the detail of corporate

3. SMEs can create requests that can be seen by the surrounding corporate with the same category, request can be responded by the corporate by sending a reply message.

4. SMEs can send a letter of offer to respond to requests from corporate, this letter is used to make offers to corporate-related according to the category.

## Cooperation

1. Ccooperatives can log in to enter the main page and can see the list of listed company (whether Corporate or SME) as well as the details.

2. To verify registered company.

3. be able to monitor the price in order to avoid price fluctuations that can damage the market price. (Optional feature)

Note: Cooperation is in progress

# Login Form
Add forgot password feature and it will be sent to the corresponding email. If email is not registered it will popup an alert message

![Login Page](screenshot/login.png?raw=true "Login Page")

# Register Form
Add front end and backend validation if the email input invalid or password is less than 6 characters. After company register it will be redirected to update company profile page.

![Login Page](screenshot/register.png?raw=true "Login Page")

# Update Company Profile
Add front end and backend validation of all the input except the company profile picture and website.

![Update Company Profile Page](screenshot/update_profile.png?raw=true "Update Company Profile Page")

# Map View
This is our main feature to see all the company with the same category around them and the user can see their company details.

![Map View Page](screenshot/map_view.png?raw=true "Map View Page")

# List View
List view is just the same like Map View. The only difference is just the display.

![List View Page](screenshot/list_view.png?raw=true "List View Page")

# Create Request
Company can make request for the other company with the same category to see the request in the request list. Add validation also for the title and request message. Photo and price is optional.

![Create Request Page](screenshot/create_request.png?raw=true "Create Request Page")

# Request List
Company can see the request that has been made and the user can reply the message to the corresponding company email.

![Request List Page](screenshot/request_list.png?raw=true "Request List Page")

# Message
Company can accept or decline message of the replied message and will be sent to the corresponding company email.
![Message Page](screenshot/message.png?raw=true "Request List Page")

Note: Still have a problem in the email and photo upload because our AWS account has just been disbanded. We will try to fix as soon as possible.

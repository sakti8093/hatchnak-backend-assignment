# hatchnack-backend-assignment

ALL REQUEST WITH EXAMPLES-->

## for running server
            
            npm run server


## 1)For Giving Order-->

            a)POST request on "http://localhost:8080/orders/createOrder"
                body ->
                 {
                    "customer_name":"customer",
                    "product_list":{
                        "switch":3,
                        "battery":1
                    },
                    "delivery_date":"14-02-2022"
                }

            b)All the above are required feild !!

            c)response example ->
                {
                "status": "success",
                "message": "Vendor Assigned",
                "id": "63996a67fca7c8283817cc1a"
                }

            d)This id will be used for getting the order details

## 2)For Getting Order Details (vendor assigned)-->

            a)GET request on "http://localhost:8080/orders/viewOrder/639968d477f067afffba7d43"

            response->
           {
            "status": "success",
            "message": {
            "_id": "63996a67fca7c8283817cc1a",
            "customer_name": "customer",
            "product_list": {
            "switch": 3,
            "battery": 1
            },
            "delivery_date": "14-02-2022",
            "vendor_details": [
            {
                "product_name": "switch",
                "vendor_id": "6398790fb59567119b8c5ad6",
                "assigned_vendor": "gamma electronics",
                "quantity": 3,
                "vendor_overall_rating": 5,
                "vendor_delivery_rating": 5,
                "price": 69
            },
            {
                "product_name": "battery",
                "vendor_id": "639878fbb59567119b8c5ad2",
                "assigned_vendor": "alpha electronics",
                "quantity": 1,
                "vendor_overall_rating": 5,
                "vendor_delivery_rating": 5,
                "price": 21
            }
            ],
            "total_price": 90,
            "delivery": false,
            "ready_for_fulfillment": false,
            "createdAt": "2022-12-14T06:17:11.875Z",
            "updatedAt": "2022-12-14T06:17:11.875Z",
            "__v": 0
        }
        }

## 3) For Adding Vendors

            a)POST request on "http://localhost:8080/vendors/CreateNewVendor"

             {
                "vendor":[
                    {
                    "vendor_name":"gamma electronics",
                    "vendor_speciality":"switch",
                    "price":20
                    },{
                    "vendor_name":"sakti electronics",
                    "vendor_speciality":"switch",
                    "price":10
                    }
                ]
             }
            response->
                {
                "status": "success",
                "message": "vendor added successfully"
                }
            
            for viewing change make a get request on "http://localhost:8080/vendors/allVendors"

## 4) for submitting final order

            a)PATCH request on "http://localhost:8080/orders/SubmitFinalOrder/63995e5bcc472cc8e3d4aee5"
            example->
            {
                "ready_for_fulfillment":true
            }

            response->
            {
            "status": "success",
            "message": "Order Marked Completed"
            }

      View Changes by making get reuest to http://localhost:8080/orders/viewOrder/639968d477f067afffba7d43

    

## 5) for marking order complete

        a) PATCH request on "http://localhost:8080/orders/MarkOrderComplete/63995e5bcc472cc8e3d4aee5"

        example->
        {
        "delivered":true
        }

        response->
        {
        "status": "success",
        "message": "Order Marked Completed"
        }

         View Changes by making get reuest to http://localhost:8080/orders/viewOrder/639968d477f067afffba7d43

         Note:- Order should finalize then order can be set to delivery

## 6)for submitting review

        a)POST request on "http://localhost:8080/vendors/submitVendorReview"

        example->
        {
            "vendor_id":"63987820f7be5e7189077297",
            "overall_rating" : 4,
            "delivery_rating" : 5
        }

        response->
        {
            "status": "success",
            "message": "Vendor Rating updated successfully"
        }
    
    for viewing change make a get request on "http://localhost:8080/vendors/allVendors"
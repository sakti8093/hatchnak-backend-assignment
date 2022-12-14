# hatchnack-backend-assignment

ALL REQUEST WITH EXAMPLES-->

## 1)For Giving Order-->

            a)POST request on "http://localhost:8080/createOrder"
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

            a)POST request on "http://localhost:8080/viewOrder"

            body->
            {
                  "id":"639968d477f067afffba7d43"
            }

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

            a)POST request on "http://localhost:8080/CreateNewVendor"

            example->

                {
                "vendor_name":"gamma electronics",
                "vendor_speciality":"switch",
                "price":20
                }

            response->

                {
                "status": "success",
                "message": "vendor added successfully"
                }

## 4) for submitting final order

            a)PATCH request on "http://localhost:8080/SubmitFinalOrder"

            example->

            {
                "id":"63995e5bcc472cc8e3d4aee5",
                "ready_for_fulfillment":true
            }

            response->

            {
            "status": "success",
            "message": "Order Marked Completed"
            }

## 5) for marking order complete

        a) PATCH request on "http://localhost:8080/MarkOrderComplete"

        example->

        {
        "id":"63995e5bcc472cc8e3d4aee5",
        "delivered":true
        }

        response->
        {
        "status": "success",
        "message": "Order Marked Completed"
        }

## 6)for submitting review

        a)POST request on "http://localhost:8080/submitVendorReview"

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
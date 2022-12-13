# hatchnack-backend-assignment

ALL REQUEST WITH EXAMPLES-->

## 1)For Giving Order-->

            a)POST request on "http://localhost:8080/createOrder"
                body ->
                {
                    "customer_name":"customer1",
                    "product_list":{
                        "switch":3,
                        "battery":3
                    },
                    "delivery_date":"14-02-2022"
                }

            b)All the above are required feild !!

            c)response example ->
                {
                "status": "success",
                "message": "Vendor Assigned",
                "id": "6398e48e40e7e89f9c116258"
                }

            d)This id will be used for getting the order details

## 2)For Getting Order Details (vendor assigned)-->

            a)POST request on "http://localhost:8080/getOrderDetails"

            body->
            {
                  "id":"6398e48e40e7e89f9c116258"
            }

            response->

            {
                "status": "success",
                "message": {
                    "_id": "6398e48e40e7e89f9c116258",
                    "customer_name": "customer1",
                    "product_list": {
                    "switch": 3,
                    "battery": 3
                    },
                    "delivery_date": "14-02-2022",
                    "vendor_details": [
                    [
                        {
                        "product_name": "switch",
                        "assigned_vendor": "gamma electronics",
                        "price": 69
                        }
                    ],
                    [
                        {
                        "product_name": "battery",
                        "assigned_vendor": "new electronics",
                        "price": 60
                        }
                    ]
                    ],
                    "total_price": 129,
                    "delivery": false,
                    "__v": 0
                }
            }

## 3) For Adding Vendors

            a)POST request on "http://localhost:8080/CreateNewVendor"

            example->

                {
                "vendor_name":"gamma electronics",
                "vendor_speciality":"switch"
                }

            response->

                {
                "status": "success",
                "message": "vendor added successfully"
                }

## 4) for submitting final order

            a)POST request on "http://localhost:8080/SubmitFinalOrder"

            example->

            {
                "id":"6398e48e40e7e89f9c116258",
                "ready_for_fulfillment":true
            }

            response->

            {
            "status": "success",
            "message": "Order Marked Completed"
            }

## 5) for marking order complete

        a) POST request on "http://localhost:8080/MarkOrderComplete"

        example->

        {
        "id":"6398e48e40e7e89f9c116258",
        "delivered":true
        }

        response->
        {
        "status": "success",
        "message": "Order Marked Completed"
        }

## 6)for submitting review

        a)POST request on "http://localhost:8080/submitVendorReview"
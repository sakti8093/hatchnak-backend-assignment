import { orderModel } from "../Models/ordermodel.js";
import { vendormodel } from "../Models/vendormodel.js";

const getVendor = async (key, list) => {
  let vendors = await vendormodel
    .find({ vendor_speciality: key })
    .sort({ delivery_rating: 1 });
  if (vendors.length < 1) {
    return 0;
  }

  let vendor_assign = {
    product_name: key,
    vendor_id:vendors[0]._id,
    assigned_vendor: vendors[0].vendor_name,
    quantity: list[key],
    vendor_overall_rating: vendors[0].overall_rating,
    vendor_delivery_rating: vendors[0].delivery_rating,
    price: vendors[0].price * list[key],
  };

  if (vendors.length > 1) {
    if (
      vendors[0].overall_rating == vendors[1].overall_rating &&
      vendors[0].delivery_rating == vendors[1].delivery_rating
    ) {
      let arrayWithSameRatings = [];

      for (let i = 0; i < vendors.length; i++) {
        if (
          vendors[i].overall_rating == vendors[0].overall_rating && vendors[i].delivery_rating == vendors[0].delivery_rating ) {
          arrayWithSameRatings.push(i);
        }
      }

      let selected =  vendors[Math.floor(Math.random() * arrayWithSameRatings.length)];

      vendor_assign.assigned_vendor = selected.vendor_name;
      vendor_assign.vendor_id=selected._id;
      vendor_assign.vendor_delivery_rating = selected.delivery_rating;
      vendor_assign.vendor_overall_rating = selected.overall_rating;
      vendor_assign.price = selected.price * list[key];

      return vendor_assign;
    } else {
      return vendor_assign;
    }
  } else {
    return vendor_assign;
  }
};

export const addOrder = async (req, res) => {
  try {
    const order = req.body;
    let list = order.product_list;

    let productDetails = [];

    for (let key in list) {
      let vendor = await getVendor(key, list);
      if (vendor == 0) {
        return res.status(404).send({
          status: "error",
          message: `vendor not found for ${key}`,
        });
      } else {
        productDetails.push(vendor);
      }
    }

    let totalPrice = productDetails.reduce((acc, elem) => {
      return acc + elem.price;
    }, 0);

    order.vendor_details = productDetails;
    order.total_price = totalPrice;
    order.delivery = false;
    order.ready_for_fulfillment = false;

    let createOrder = await orderModel.create(order);
    res.send({
      status: "success",
      message: "Vendor Assigned",
      id: createOrder._id,
    });
  } catch (err) {
    if (err.message) {
      res.status(400).send({
        status: "error",
        message: err.message,
      });
    } else {
      res.status(500).send({
        status: "error",
        message: err,
      });
    }
  }
};

export const getOrderDetails = async function (req, res) {
  const { id } = req.body;
  try {
    if (id) {
      let orderDetails = await orderModel.findOne({ _id: id });
      if (!orderDetails) {
        res.send({
          status: "error",
          message: "No Order Details Found",
        });
      } else {
        res.send({
          status: "success",
          message: orderDetails,
        });
      }
    } else {
      res.status(404).send({
        status: "error",
        message: "Enter Valid Id",
      });
    }
  } catch (err) {
    if (err.message) {
      res.status(400).send({
        status: "error",
        message: err.message,
      });
    } else {
      res.status(500).send({
        status: "error",
        message: err,
      });
    }
  }
};

export const MarkOrderComplete = async (req, res) => {
  try {
    const { id, delivered } = req.body;
      if (typeof id == "string" && typeof delivered == "boolean") {
        if (id.length != 24) {
            res.send({ status: "error", message: " id should be of 24 characters" });
          } else {
        let check = await orderModel.findOne({ _id: id });

        if (!check) {
          res.status(404).send({
            status: "error",
            message: "Enter Valid id",
          });
        } else {
          if (check.ready_for_fulfillment) {
            await orderModel.findByIdAndUpdate(id, { delivery: delivered });
            res.status(200).send({
              status: "success",
              message: "Order Marked Completed",
            });
          } else {
            res.status(400).send({
              status: "error",
              message: "Not Ready for fulfilment",
            });
          }
        }
      } 
    }else {
        res.status(400).send({
          status: "error",
          message: "Fill all required fields",
        });
      }
  } catch (err) {
    if (err.message) {
      res.status(400).send({
        status: "error",
        message: err.message,
      });
    } else {
      res.status(500).send({
        status: "error",
        message: err,
      });
    }
  }
};

export const finalizeOrder = async (req, res) => {
  try {
    const { id, ready_for_fulfillment } = req.body;

    if (typeof id == "string" && typeof ready_for_fulfillment == "boolean") {
      if (id.length != 24) {
        res.send({
          status: "error",
          message: " id should be of 24 characters",
        });
      } else {
        let fulfil = await orderModel.findByIdAndUpdate(id, {
          ready_for_fulfillment: ready_for_fulfillment,
        });

        if (!fulfil) {
          res.status(404).send({
            status: "error",
            message: "Enter Valid id",
          });
        } else {
          res.status(200).send({
            status: "success",
            message: "Order Marked Completed",
          });
        }
      }
    } else {
      res.status(400).send({
        status: "error",
        message: "Invalid Type of data",
      });
    }
  } catch (err) {
    if (err.message) {
      res.status(500).send({
        status: "error",
        message: err.message,
      });
    } else {
      res.status(500).send({
        status: "error",
        message: err,
      });
    }
  }
};

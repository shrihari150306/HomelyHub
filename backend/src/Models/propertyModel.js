import slugify from "slugify";
import mongoose from "mongoose";

const propertySchema = new mongoose.Schema({
   propertyName:{
      type:String,
      required:[true,"Please enter property name"],
      unique:true
   },
   description:{
      type:String,
      required:[true,"Please enter property description"],
   },
   extraInfo:{
      type:String,
      default:"No extra information provided"
   },
   prpertyType:{
      type:String,
      enum:["House","Flat","Guest House","Hotel"],
      default:"House"
   },
   roomType:{
      type:String,
      enum:["Anytype","Room","Home"],
      default:"Anytype"
   },
   maximumGuest:{
        type:Number,
        required:[true,"Please enter maximum guest capacity"],
   },
   amenities:[
    {
        name:{
            type:String,
            required:[true,"Please enter amenity name"],
            enum:["Wifi","TV","AC","Kitchen","Parking","Pool","Gym","Washer","Dryer","Heating","Iron","Hair Dryer"]
    },
    icon:{
        type:String,
        required:[true]
    }
    }
   ],
images:{
    type:[
        {
            public_id:{
                type:String,
                
        },
        url:{
            type:String,
            required:[true]
        }
    }
    ],
    validate:
    {
        validator:function(arr){
            return arr.length >= 6;
    },
    message:"Please upload at least 6 images"
}  
},
price:{
    type:Number,
    required:[true,"Please enter property price per night"],
    default:500
},
address:{
    area:String,
    city:String,
    state:String,
    pincode:Number
},

currentBookings:[
      {
        bookingId:{
            type:mongoose.Schema.Types.ObjectId,
            ref: "Booking"
        },
        fromDate:{
        type:Date
    },
    toDate:{
        type:Date
    },
    userId:{
        type:mongoose.Schema.Types.ObjectId,
            ref: "User"
    }
      }
],

userId:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"User"
},
slug:String,
checkInTime:{
    type:String,
    default:"11:00"
},
checkOutTime:{
    type:String,
    default:"13:00"
},

})


propertySchema.pre("save",function(){
    this.slug = slugify(this.propertyName,{lower:true});

})

propertySchema.pre("save",function(){
    this.address.city = this.address.city.toLowerCase().replaceAll(" ","")
    

})

//const Property = mongoose.model("Property",propertySchema);
const Property = mongoose.models.Property || mongoose.model("Property",propertySchema);

export{Property};

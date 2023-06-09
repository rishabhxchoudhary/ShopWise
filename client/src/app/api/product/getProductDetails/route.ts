import { NextRequest, NextResponse } from "next/server";

export async function POST(req: any) {
  const data = await req.body;
  console.log(data);
  
  const ProductData = {
    name: "Airpod- Max",
    description:
      "A perfect example of exhilarating high quality audio and the efortless magic of AirPods. The ultimate personal listening experience is here.",
    category: "Headphones",
    brand: "Apple",
    price: 99.99,
    variants: [
      {
        option: "Size",
        values: ["Small", "Medium", "Large"],
        availability: ["in stock", "out of stock", "in stock"],
      },
      {
        option: "Color",
        values: ["White", "Blue", "Red", "Purple", "Black"],
        availability: [
          "in stock",
          "in stock",
          "out of stock",
          "in stock",
          "in stock",
        ],
      },
    ],
    images: {
      Red: "red_product_image.jpg",
      Blue: "blue_product_image.jpg",
      Green: "green_product_image.jpg",
    },
    ratings: {
      average: 4.5,
      count: 10,
    },
    reviews: [
      {
        author: "Rishabh",
        rating: 5,
        comment: "Great product!",
      },
      {
        author: "Paras",
        rating: 4,
        comment: "Good value for money.",
      },
    ],
    specifications: {
      "Audio Technology": [
        "Apple-designed dynamic driver",
        "Active Noise Cancellation",
        "Transparency mode",
        "Personalised Spatial Audio with dynamic head tracking",
        "Adaptive EQ",
      ],
      Sensors: [
        "Optical sensor (each ear cup)",
        "Position sensor (each ear cup)",
        "Case-detect sensor (each ear cup)",
        "Accelerometer (each ear cup)",
        "Gyroscope (left ear cup)",
      ],
      Microphones: [
        "Eight microphones for Active Noise Cancellation",
        "Three microphones for voice pickup (two shared with Active Noise Cancellation and one additional microphone)",
      ],
      Chip: ["Apple H1 headphone chip (each ear cup)"],
      Controls: [
        "Digital Crown",
        "Noise Control button",
        "volume up/down",
        "play/pause",
        "skip forward/backward",
        "answer/end call",
        "Siri",
      ],
      "Battery Life": [
        "Up to 20 hours of listening time on a single charge with Active Noise Cancellation or Transparency mode enabled3",
        "Up to 20 hours of movie playback on a single charge with spatial audio on4",
        "Up to 20 hours of talk time on a single charge5",
        "5 minutes of charge time provides around 1.5 hours of listening time6",
      ],
      "Charging Case": ["Charging via Lightning connector"],
    },
    warranty: "1-year manufacturer warranty",
    shippingDetails: {
      shippingOptions: [
        {
          option: "Standard Shipping",
          cost: 5.99,
          estimatedDelivery: "3-5 business days",
        },
        {
          option: "Express Shipping",
          cost: 9.99,
          estimatedDelivery: "1-2 business days",
        },
      ],
    },
    tags: ["Apple", "Headphones", "Airpods", "Max"],
    metaDescription:
      "See full technical specifications for AirPods Max — audio technology, size, weight, battery life and accessibility features.",
  };

  return NextResponse.json({ data: ProductData });
}

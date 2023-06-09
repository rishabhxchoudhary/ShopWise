import React from 'react'
import footerCSS from './Footer.module.css'
import Image from 'next/image'

// Assets Imports
import footerLogo from '../../Assets/Footer/footer_logo.svg'
import Stripe from '../../Assets/Footer/stripe.png'
import Visa from '../../Assets/Footer/visa.png'
import MasterCard from '../../Assets/Footer/Mastercard.png'
import AmazonPay from '../../Assets/Footer/Amazon.png'
import Klarna from '../../Assets/Footer/Klarna.png'
import PayPal from '../../Assets/Footer/PayPal.png'
import GooglePay from '../../Assets/Footer/GooglePay.png'
import ApplePay from '../../Assets/Footer/ApplePay.png'

const Footer = () => {
  return (
    <div className={footerCSS.container}>
        <div className={footerCSS.footer_top}>
            <div className={footerCSS.footer_columns}>
                <div className={footerCSS.top_left}>
                    <Image src={footerLogo} className={footerCSS.footer_logo} alt="footer logo" />
                    <p className={footerCSS.footer_paragraph}>Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit.</p>
                    <div className={footerCSS.footer_payment_wrap}>
                        <div className={footerCSS.footer_menu_title}>Accepted Payments</div>
                        <div className={footerCSS.footer_payment_thumb_wrap}>
                            <div className={footerCSS.payment_single_item}>
                            <Image src={Stripe} alt="stripe" />
                            </div>
                            <div className={footerCSS.payment_single_item}>
                            <Image src={Visa} alt="stripe" />
                            </div>
                            <div className={footerCSS.payment_single_item}>
                            <Image src={MasterCard} alt="stripe" />
                            </div>
                            <div className={footerCSS.payment_single_item}>
                            <Image src={AmazonPay} alt="stripe" />
                            </div>
                            <div className={footerCSS.payment_single_item}>
                            <Image src={Klarna} alt="stripe" />
                            </div>
                            <div className={footerCSS.payment_single_item}>
                            <Image src={PayPal} alt="stripe" />
                            </div>
                            <div className={footerCSS.payment_single_item}>
                            <Image src={GooglePay} alt="stripe" />
                            </div>
                            <div className={footerCSS.payment_single_item}>
                            <Image src={ApplePay} alt="stripe" />
                            </div>
                        </div>
                    </div>
                </div>
                <div className={footerCSS.footer_nav}>
                    <h2 className={footerCSS.footer_menu_title}>Department</h2>
                    <ul className={footerCSS.footer_menu_list}>
                        <li className={footerCSS.list}>Fashion</li>
                        <li className={footerCSS.list}>Education Product</li>
                        <li className={footerCSS.list}>Frozen Food</li>
                        <li className={footerCSS.list}>Beverages</li>
                        <li className={footerCSS.list}>Organic Grocery</li>
                        <li className={footerCSS.list}>Office Supplies</li>
                        <li className={footerCSS.list}>Beauty Products</li>
                        <li className={footerCSS.list}>Books</li>
                        <li className={footerCSS.list}>Electronics & Gadget</li>
                        <li className={footerCSS.list}>Travel Accessories</li>
                        <li className={footerCSS.list}>Fitness</li>
                        <li className={footerCSS.list}>Sneakers</li>
                        <li className={footerCSS.list}>Toys</li>
                        <li className={footerCSS.list}>Furniture</li>
                    </ul>
                </div>
                <div className={footerCSS.footer_nav}>
                    <h2 className={footerCSS.footer_menu_title}>About Us</h2>
                    <ul className={footerCSS.footer_menu_list}>
                        <li className={footerCSS.list}>About ShopWise</li>
                        <li className={footerCSS.list}>Careers</li>
                        <li className={footerCSS.list}>News & Blog</li>
                        <li className={footerCSS.list}>Shop By Location</li>
                        <li className={footerCSS.list}>Shopcart Brands</li>
                        <li className={footerCSS.list}>Office Supplies</li>
                        <li className={footerCSS.list}>Affiliate & Partners</li>
                        <li className={footerCSS.list}>Ideas & Guides</li>
                    </ul>
                </div>
                <div className={footerCSS.footer_nav}>
                    <h2 className={footerCSS.footer_menu_title}>Services</h2>
                    <ul className={footerCSS.footer_menu_list}>
                        <li className={footerCSS.list}>Gift Card</li>
                        <li className={footerCSS.list}>Mobile App</li>
                        <li className={footerCSS.list}>Shipping & Delivery</li>
                        <li className={footerCSS.list}>Order Pickup</li>
                        <li className={footerCSS.list}>Account Signup</li>
                    </ul>
                </div>
                <div className={footerCSS.footer_nav}>
                    <h2 className={footerCSS.footer_menu_title}>Help</h2>
                    <ul className={footerCSS.footer_menu_list}>
                        <li className={footerCSS.list}>Shopcart Help</li>
                        <li className={footerCSS.list}>Returns</li>
                        <li className={footerCSS.list}>Track Orders</li>
                        <li className={footerCSS.list}>Contact Us</li>
                        <li className={footerCSS.list}>Feedback</li>
                        <li className={footerCSS.list}>Security & Fraud</li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Footer
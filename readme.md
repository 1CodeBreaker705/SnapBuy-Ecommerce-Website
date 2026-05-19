# SnapBuy

Production-style full stack multi-vendor ecommerce platform built using React, FastAPI, MongoDB, Zustand, Razorpay, and Cloudinary.

---

# Overview

SnapBuy is a modern ecommerce platform engineered with scalable backend architecture, responsive frontend engineering, secure authentication systems, and real-world ecommerce workflows.

The platform supports three different user flows:

- Public Users
- Customers
- Merchants

Public users can browse products and open product detail pages without authentication. Customers gain access to cart, wishlist, checkout, and order management systems, while merchants can manage products and fulfillment workflows through a dedicated merchant dashboard.

---

# Tech Stack

## Frontend

- React
- Tailwind CSS
- Zustand
- React Router
- React Hook Form
- Zod Validation
- React Hot Toast

## Backend

- FastAPI
- MongoDB
- Motor Async Driver
- Pydantic
- JWT Authentication
- HTTP-only Cookie Sessions

## Third Party Services

- Razorpay
- Cloudinary

---

# Backend Architecture

The backend follows a layered architecture:

Routes → Controllers → Services → Database

## Routes Layer

Handles:

- API endpoints
- Route protection
- Dependency injection
- Request validation

## Controllers Layer

Handles:

- Request forwarding
- Cookie handling
- Response management

## Services Layer

Handles:

- Business logic
- Database operations
- Cloudinary integration
- Razorpay integration
- Authentication workflows

---

# Authentication System

## Features

- JWT authentication
- HTTP-only secure cookies
- Protected routes
- Token verification middleware
- Secure logout handling
- Role-based authorization

## Security

- bcrypt password hashing
- Invalid token handling
- Token expiration validation
- Environment variable secret management

---

# Role-Based Access Control

The platform supports:

- Customers
- Merchants

Protected APIs are enforced using FastAPI dependencies and middleware-based authorization.

---

# Product Management System

## Merchant Features

- Add products
- Delete products
- View merchant products
- Upload multiple images
- Merchant ownership protection
- Merchant dashboard analytics
- Manange and fullfil orders 
- Merchant name on products

## Product Features

- SEO-friendly slug generation
- Cloudinary image uploads
- Multiple image support
- Product filtering system
- Product search system
- Dynamic public product pages
- Multiple product image view support
- order lifecycle (product->cart->checkout->confirm/failed->failed(order-cancelled)/success(order-confirmed)/otherwise order pending->order status view by customer/order status managed by merchants)

---

# Search & Filtering System

SnapBuy includes a dynamic product discovery system with:

- Product title search
- Main category filtering
- Subcategory filtering
- Combined layered filtering
- Dynamic MongoDB query generation

---

# Installation & Setup

1️) Frontend Setup
cd frontend
npm install
npm run dev

2️) Backend Setup
cd backend
pip install -r requirements.txt
uvicorn app:app --reload

---

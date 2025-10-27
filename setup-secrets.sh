#!/bin/bash

# Setup Supabase Secrets for E-shop
# This script helps you set up all required secrets for Edge Functions

echo "🔐 Setting up Supabase secrets for E-shop..."
echo ""
echo "Make sure you have your API keys ready!"
echo ""

# Check if logged in
npx supabase projects list > /dev/null 2>&1
if [ $? -ne 0 ]; then
    echo "❌ Not logged in to Supabase. Please run: npx supabase login"
    exit 1
fi

echo "✅ Logged in to Supabase"
echo ""

# Stripe keys
echo "💳 Setting up Stripe keys..."
echo "Enter your Stripe Secret Key (sk_test_... or sk_live_...):"
read -s STRIPE_SECRET_KEY
npx supabase secrets set STRIPE_SECRET_KEY="$STRIPE_SECRET_KEY"
echo "✅ Stripe Secret Key set"
echo ""

echo "Enter your Stripe Webhook Secret (whsec_...):"
read -s STRIPE_WEBHOOK_SECRET
npx supabase secrets set STRIPE_WEBHOOK_SECRET="$STRIPE_WEBHOOK_SECRET"
echo "✅ Stripe Webhook Secret set"
echo ""

# ComGate keys
echo "🏦 Setting up ComGate keys..."
echo "Enter your ComGate Merchant ID:"
read COMGATE_MERCHANT
npx supabase secrets set COMGATE_MERCHANT="$COMGATE_MERCHANT"
echo "✅ ComGate Merchant ID set"
echo ""

echo "Enter your ComGate Secret:"
read -s COMGATE_SECRET
npx supabase secrets set COMGATE_SECRET="$COMGATE_SECRET"
echo "✅ ComGate Secret set"
echo ""

echo "Use test mode for ComGate? (true/false):"
read COMGATE_TEST_MODE
npx supabase secrets set COMGATE_TEST_MODE="$COMGATE_TEST_MODE"
echo "✅ ComGate Test Mode set to $COMGATE_TEST_MODE"
echo ""

# Verify
echo "📋 Verifying secrets..."
npx supabase secrets list

echo ""
echo "🎉 All secrets have been set!"
echo ""
echo "Next steps:"
echo "  1. Deploy Edge Functions: ./deploy-functions.sh"
echo "  2. Set up webhooks in Stripe and ComGate dashboards"
echo "  3. Update your .env file with frontend keys"
echo ""

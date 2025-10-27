#!/bin/bash

# Deploy E-shop Edge Functions to Supabase
# Make sure you're logged in: npx supabase login

echo "🚀 Deploying E-shop Edge Functions to Supabase..."
echo ""

# Check if user is logged in
echo "📝 Checking Supabase login status..."
npx supabase projects list > /dev/null 2>&1
if [ $? -ne 0 ]; then
    echo "❌ Not logged in to Supabase. Please run: npx supabase login"
    exit 1
fi

echo "✅ Logged in to Supabase"
echo ""

# Deploy Stripe functions
echo "💳 Deploying Stripe payment function..."
npx supabase functions deploy create-stripe-payment
if [ $? -ne 0 ]; then
    echo "❌ Failed to deploy create-stripe-payment"
    exit 1
fi
echo "✅ Deployed create-stripe-payment"
echo ""

echo "💳 Deploying Stripe webhook function..."
npx supabase functions deploy stripe-webhook
if [ $? -ne 0 ]; then
    echo "❌ Failed to deploy stripe-webhook"
    exit 1
fi
echo "✅ Deployed stripe-webhook"
echo ""

# Deploy ComGate functions
echo "🏦 Deploying ComGate payment function..."
npx supabase functions deploy create-comgate-payment
if [ $? -ne 0 ]; then
    echo "❌ Failed to deploy create-comgate-payment"
    exit 1
fi
echo "✅ Deployed create-comgate-payment"
echo ""

echo "🏦 Deploying ComGate webhook function..."
npx supabase functions deploy comgate-webhook
if [ $? -ne 0 ]; then
    echo "❌ Failed to deploy comgate-webhook"
    exit 1
fi
echo "✅ Deployed comgate-webhook"
echo ""

echo "🎉 All functions deployed successfully!"
echo ""
echo "⚠️  Don't forget to:"
echo "   1. Set secrets: npx supabase secrets set STRIPE_SECRET_KEY=sk_..."
echo "   2. Set up webhooks in Stripe and ComGate dashboards"
echo "   3. Update .env with your API keys"
echo ""
echo "📖 See DEPLOY_INSTRUCTIONS.md for detailed setup guide"

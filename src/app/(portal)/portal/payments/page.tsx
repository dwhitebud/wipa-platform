import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { CreditCard, ExternalLink, CheckCircle, AlertCircle } from "lucide-react";
import { getUserData } from "@/lib/supabase/get-user-data";
import { createClient } from "@/lib/supabase/server";
import { format } from "date-fns";

export const metadata = {
  title: "Payments",
};

export default async function PaymentsPage() {
  const userData = await getUserData();
  const supabase = await createClient();
  const subscription = userData?.subscription;
  const plan = subscription?.membership_plans as { name: string; price: number } | null;
  const user = userData?.user;

  // Fetch payment history
  const { data: payments } = user
    ? await supabase
        .from("payments")
        .select("*")
        .eq("profile_id", user.id)
        .order("created_at", { ascending: false })
        .limit(20)
    : { data: [] };

  const isActive = subscription?.status === "active";
  const planName = plan?.name || "No Plan";
  const planPrice = plan?.price ? `$${(plan.price / 100).toFixed(2)}` : "—";

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-light tracking-tight sm:text-3xl">Payments</h1>
        <p className="mt-1 text-muted-foreground">
          Manage your membership subscription and view payment history
        </p>
      </div>

      <div className="grid gap-4 sm:gap-6 lg:grid-cols-3">
        {/* Subscription Status */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="text-lg">Membership Subscription</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-start justify-between">
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-xl font-semibold">{planName}</h3>
                  {isActive ? (
                    <Badge className="bg-green-100 text-green-700" variant="secondary">
                      <CheckCircle className="mr-1 h-3 w-3" />
                      Active
                    </Badge>
                  ) : (
                    <Badge className="bg-amber-100 text-amber-700" variant="secondary">
                      <AlertCircle className="mr-1 h-3 w-3" />
                      {subscription?.status || "Inactive"}
                    </Badge>
                  )}
                </div>
                <p className="mt-1 text-sm text-muted-foreground">
                  {isActive && subscription?.current_period_end
                    ? `${planPrice} / year — Renews on ${format(new Date(subscription.current_period_end), "MMMM d, yyyy")}`
                    : "No active subscription"}
                </p>
              </div>
            </div>
            <Separator />
            <div className="grid gap-4 text-sm sm:grid-cols-3">
              <div>
                <p className="text-muted-foreground">Member Since</p>
                <p className="mt-1 font-medium">
                  {user?.created_at
                    ? format(new Date(user.created_at), "MMMM d, yyyy")
                    : "—"}
                </p>
              </div>
              {subscription?.current_period_start && subscription?.current_period_end && (
                <div>
                  <p className="text-muted-foreground">Current Period</p>
                  <p className="mt-1 font-medium">
                    {format(new Date(subscription.current_period_start), "MMM d, yyyy")} —{" "}
                    {format(new Date(subscription.current_period_end), "MMM d, yyyy")}
                  </p>
                </div>
              )}
              <div>
                <p className="text-muted-foreground">Payment Method</p>
                <p className="mt-1 flex items-center gap-1.5 font-medium">
                  <CreditCard className="h-4 w-4" />
                  {subscription?.stripe_customer_id ? "On file" : "Not set"}
                </p>
              </div>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row">
              <Button variant="outline" className="gap-2">
                <ExternalLink className="h-4 w-4" />
                Manage Subscription
              </Button>
              <Button variant="outline" className="gap-2">
                <CreditCard className="h-4 w-4" />
                Update Payment Method
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Summary Card */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Summary</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="rounded-lg bg-gold/5 p-4 text-center">
              <p className="text-3xl font-semibold text-gold">{planPrice}</p>
              <p className="mt-1 text-xs text-muted-foreground">Annual Dues</p>
            </div>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Status</span>
                <span className="font-medium capitalize">
                  {subscription?.status || "No subscription"}
                </span>
              </div>
              {subscription?.current_period_end && (
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Next Payment</span>
                  <span className="font-medium">
                    {format(new Date(subscription.current_period_end), "MMM d, yyyy")}
                  </span>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Payment History */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Payment History</CardTitle>
        </CardHeader>
        <CardContent>
          {payments && payments.length > 0 ? (
            <div className="space-y-3">
              {payments.map((payment: any) => (
                <div
                  key={payment.id}
                  className="flex items-center justify-between rounded-lg border border-border p-4"
                >
                  <div className="flex-1">
                    <p className="text-sm font-medium">
                      {payment.description || "Payment"}
                    </p>
                    <p className="mt-0.5 text-xs text-muted-foreground">
                      {format(new Date(payment.created_at), "MMM d, yyyy")}
                    </p>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="text-sm font-semibold">
                      ${(payment.amount / 100).toFixed(2)}
                    </span>
                    <Badge
                      className={
                        payment.status === "succeeded"
                          ? "bg-green-100 text-green-700"
                          : "bg-amber-100 text-amber-700"
                      }
                      variant="secondary"
                    >
                      {payment.status === "succeeded" ? "Paid" : payment.status}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="py-8 text-center text-sm text-muted-foreground">
              No payment history yet
            </p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

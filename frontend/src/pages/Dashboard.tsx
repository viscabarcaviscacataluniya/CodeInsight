
import { Link } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CodeIcon, ArrowLeftIcon } from "lucide-react";

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-background/95">
      <div className="container mx-auto py-12 px-4">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Algorithm Dashboard</h1>
          <Button variant="outline" asChild className="backdrop-blur-sm bg-background/50 border-border/50 shadow-lg hover:scale-105 transition-all duration-200">
            <Link to="/">
              <ArrowLeftIcon className="mr-2 h-4 w-4" /> Back to Home
            </Link>
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="backdrop-blur-sm bg-card/80 border-border/50 shadow-2xl hover:shadow-3xl transition-all duration-300 hover:scale-105">
            <CardHeader className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent rounded-t-lg"></div>
              <div className="relative">
                <CardTitle>Recent Activity</CardTitle>
                <CardDescription>Your recently used algorithms</CardDescription>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">No recent activity</p>
              <Button className="w-full mt-4 backdrop-blur-sm shadow-lg hover:scale-105 transition-all duration-200" asChild>
                <Link to="/editor">
                  <CodeIcon className="mr-2 h-4 w-4" /> Start Coding
                </Link>
              </Button>
            </CardContent>
          </Card>

          <Card className="backdrop-blur-sm bg-card/80 border-border/50 shadow-2xl hover:shadow-3xl transition-all duration-300 hover:scale-105">
            <CardHeader className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent rounded-t-lg"></div>
              <div className="relative">
                <CardTitle>Algorithm Complexity</CardTitle>
                <CardDescription>Time and space complexity guide</CardDescription>
              </div>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                <li className="flex justify-between">
                  <span>Bubble Sort</span>
                  <span className="text-muted-foreground">O(n²)</span>
                </li>
                <li className="flex justify-between">
                  <span>Quick Sort</span>
                  <span className="text-muted-foreground">O(n log n)</span>
                </li>
                <li className="flex justify-between">
                  <span>Binary Search</span>
                  <span className="text-muted-foreground">O(log n)</span>
                </li>
              </ul>
              <Button variant="outline" className="w-full mt-4 backdrop-blur-sm bg-background/50 border-border/50 shadow-lg hover:scale-105 transition-all duration-200">
                View Full Chart
              </Button>
            </CardContent>
          </Card>

          <Card className="backdrop-blur-sm bg-card/80 border-border/50 shadow-2xl hover:shadow-3xl transition-all duration-300 hover:scale-105">
            <CardHeader className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent rounded-t-lg"></div>
              <div className="relative">
                <CardTitle>LeetCode Problems</CardTitle>
                <CardDescription>Practice algorithm challenges</CardDescription>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <Button variant="outline" className="w-full justify-start backdrop-blur-sm bg-background/50 border-border/50 shadow-lg hover:scale-102 transition-all duration-200" asChild>
                  <Link to="/editor?algorithm=twoSum">Two Sum</Link>
                </Button>
                <Button variant="outline" className="w-full justify-start backdrop-blur-sm bg-background/50 border-border/50 shadow-lg hover:scale-102 transition-all duration-200" asChild>
                  <Link to="/editor?algorithm=validParentheses">Valid Parentheses</Link>
                </Button>
                <Button variant="outline" className="w-full justify-start backdrop-blur-sm bg-background/50 border-border/50 shadow-lg hover:scale-102 transition-all duration-200" asChild>
                  <Link to="/editor?algorithm=maxSubarray">Maximum Subarray</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

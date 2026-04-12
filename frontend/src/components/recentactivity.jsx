import { FaUserCircle } from "react-icons/fa"


const activities = [
{ name:"Dr Sarah Johnson", time:"now" },
{ name:"Arun Mehta", time:"2m ago" },
{ name:"Priya Sharma", time:"4m ago" },

]
export default function RecentActivity() {

return(

<div className="bg-white border rounded-xl p-5">

<h2 className="text-lg font-semibold mb-4">
Recent Activity
</h2>

<div className="space-y-4">

{activities.map((a)=>(

<div key={a.name} className="flex items-center justify-between">

<div className="flex items-center gap-3">

<FaUserCircle className="text-2xl text-teal-500"/>

<span className="text-sm">
{a.name}
</span>

</div>

<span className="text-xs text-gray-500">
{a.time}
</span>

</div>

))}

</div>

</div>

)

}
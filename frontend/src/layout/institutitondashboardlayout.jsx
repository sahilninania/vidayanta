import { useState } from "react";
import InstitutionSidebar from "../components/institutionsidebar";
import Institutionheader from "../components/institutionheader";

export default function InstitutionLayout({ children }) {

const [open, setOpen] = useState(false);

return (
<div>

<InstitutionSidebar open={open} setOpen={setOpen} />
<Institutionheader setOpen={setOpen} />

<div className=" md:ml-64 p-2 bg-gray-50 min-h-screen">
{children}
</div>

</div>
);
}
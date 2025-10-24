import prismadb from "@/lib/prismadb";

import { CompanionForm } from "./components/companion-form";

interface CompanionIdPageProps {
    params: {
        companionId: string;
    };
};

const CompanionPage = async ({
    params
}: CompanionIdPageProps) => {
    //TODO: Check subscription

    // // Await params first before accessing its properties (required by Next app-router)
    // const { companionId } = await params;

    const companion = await prismadb.companion.findUnique({
        where: {
            id: params.companionId,
        }
    });

    const categories = await prismadb.category.findMany();

    return ( 
        <CompanionForm  
            initialData={companion}
            categories={categories}
        />
     );
}
 
export default CompanionPage;
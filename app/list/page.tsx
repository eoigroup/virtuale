import CategorizedPersonasPage from "@/components/CategorizedPersonasPage/page";
import { PERSONA_ACTIONS } from "@/lib/actions";
import { AGENT_API_KEY, AGENT_AUTHOR, API_URL } from "@/lib/config";
import { IPersona } from "@/types/persona";
import Layout from "@/components/static-page-layout/page";

const ListPage = async () => {
  const body: BodyInit = new FormData();
  body.append("action", PERSONA_ACTIONS.GET_ALL_VIRTUALE_PERSONAS);

  const requestOptions: RequestInit = {
    method: "POST",
    headers: {
      Authorization: `Api-Key ${AGENT_API_KEY}`,
      author: AGENT_AUTHOR,
      ContentType: "multipart/form-data",
    },
    body: body,
  };

  const response = await fetch(`${API_URL}/api/personas`, requestOptions);

  if (!response.ok) {
    return "Something went wrong";
  }
  
  const res = await response.json();
  const personas = res.data.filter((p: IPersona) => p.virtuale_ai_enable);

  return (
    <Layout>
      <div className="container mx-auto flex-grow">
        <CategorizedPersonasPage personas={personas} />
      </div>
    </Layout>
  );
};

export default ListPage;
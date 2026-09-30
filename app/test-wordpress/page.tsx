import { fetchGraphQL } from "@/lib/wpgraphql";

const query = `
  {
    generalSettings {
      title
      description
      url
    }
  }
`;

type WordPressData = {
  generalSettings: {
    title: string;
    description: string;
    url: string;
  };
};

export default async function TestWordPress() {
  const data = await fetchGraphQL<WordPressData>(query);

  return (
    <main className="p-10">
      <h1>{data.generalSettings.title}</h1>

      <p>{data.generalSettings.description}</p>

      <p>{data.generalSettings.url}</p>
    </main>
  );
}
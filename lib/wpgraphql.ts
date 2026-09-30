const WORDPRESS_GRAPHQL_URL =
  process.env.WORDPRESS_GRAPHQL_URL as string;

export async function fetchGraphQL<T>(
  query: string,
  variables?: Record<string, unknown>
): Promise<T> {
  const response = await fetch(WORDPRESS_GRAPHQL_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query,
      variables,
    }),
  });

  if (!response.ok) {
    throw new Error(
      `WordPress GraphQL request failed: ${response.status}`
    );
  }

  const result = await response.json();

  if (result.errors) {
    throw new Error(JSON.stringify(result.errors));
  }

  return result.data;
}
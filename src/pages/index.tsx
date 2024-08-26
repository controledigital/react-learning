// src/pages/index.jsx
export default function Home({ name }) {
  return <div>Hello, {name}!</div>;
}

export async function getServerSideProps() {
  const res = await fetch('http://localhost:3000/api/hello');
  const data = await res.json();

  return {
    props: {
      name: data.name,
    },
  };
}

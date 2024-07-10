import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import clientPromise from '../../lib/mongodb';
import NavbarIn from '@/components/NavbarIn';

const ProjectDesign = ({ project }) => {
  const router = useRouter();
  const { id } = router.query;
  const [projectData, setProjectData] = useState(project);

  useEffect(() => {
    if (!projectData) {
      // Fetch project data if not provided through SSR
      fetch(`/api/projects/${id}`)
        .then((res) => res.json())
        .then((data) => setProjectData(data));
    }
  }, [id, projectData]);

  if (!projectData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-800 text-white">
      <NavbarIn />
      <div className="container mx-auto p-8">
        <h1 className="text-4xl font-bold mb-4 mt-10">Progettazione del Progetto</h1>
        <h2 className="text-2xl mb-4">{projectData.name}</h2>
        <p className="mb-8">{projectData.description}</p>
        {/* Add more project design components here */}
      </div>
    </div>
  );
};

export async function getServerSideProps(context) {
  const { id } = context.params;

  try {
    const client = await clientPromise;
    const db = client.db('Users_form_registration');
    const project = await db.collection('users').findOne(
      { 'projects._id': new ObjectId(id) },
      { projection: { 'projects.$': 1 } }
    );

    if (!project || !project.projects || project.projects.length === 0) {
      return {
        notFound: true,
      };
    }

    return {
      props: {
        project: project.projects[0],
      },
    };
  } catch (error) {
    return {
      props: {
        project: null,
      },
    };
  }
}

export default ProjectDesign;

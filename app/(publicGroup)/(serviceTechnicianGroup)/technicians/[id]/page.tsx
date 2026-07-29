import React from 'react';

const TechnicianByIdPage = async ({
  params,
}: { params: Promise<{ id: string }> }) => {
  const id = await (await (params)).id
  return (
    <div>
      technician id: {id}
    </div>
  );
};

export default TechnicianByIdPage;
import React from "react";

function page({ params }: any) {
  return (
    <div>
      <h2>This is Product number {params.id}</h2>
    </div>
  );
}

export default page;

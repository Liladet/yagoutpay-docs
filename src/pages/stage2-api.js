import React from "react";
import SwaggerUI from "swagger-ui-react";
import "swagger-ui-react/swagger-ui.css";
import Layout from "@theme/Layout";
import spec from "../../openapi/stage2.yaml";

export default function Stage2Api() {
  return (
    <Layout title="Stage 2 API">
      <SwaggerUI spec={spec} />
    </Layout>
  );
}

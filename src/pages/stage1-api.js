import React from "react";
import SwaggerUI from "swagger-ui-react";
import "swagger-ui-react/swagger-ui.css";
import Layout from "@theme/Layout";
import spec from "../../openapi/stage1.yaml";

export default function Stage1Api() {
  return (
    <Layout title="Stage 1 API">
      <SwaggerUI spec={spec} />
    </Layout>
  );
}

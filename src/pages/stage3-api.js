import React from "react";
import SwaggerUI from "swagger-ui-react";
import "swagger-ui-react/swagger-ui.css";
import Layout from "@theme/Layout";
import spec from "../../openapi/stage3.yaml";

export default function Stage3Api() {
  return (
    <Layout title="Stage 3 API">
      <SwaggerUI spec={spec} />
    </Layout>
  );
}

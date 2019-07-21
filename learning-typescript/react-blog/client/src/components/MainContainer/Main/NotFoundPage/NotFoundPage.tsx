import React, { FunctionComponent } from "react";
import Article from "Components/Article/Article";
import Paragraph from "Components/Paragraph/Paragraph";

const NotFoundPage: FunctionComponent = () => (
  <Article>
    <Paragraph>
      404. The page hasn't been found.
    </Paragraph>
  </Article>
);

export default NotFoundPage;
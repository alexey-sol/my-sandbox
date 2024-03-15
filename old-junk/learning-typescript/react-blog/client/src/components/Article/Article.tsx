import React, { FunctionComponent } from "react";
import styles from "./Article.module.scss";

const Article: FunctionComponent<{}> = (props) => (
  <div className={ styles.Article }>
    { props.children }
  </div>
);

export default Article;
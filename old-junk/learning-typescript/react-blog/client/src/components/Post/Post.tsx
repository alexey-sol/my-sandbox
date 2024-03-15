import React from "react";
import { NavLink } from "react-router-dom";
import truncate from "html-truncate";
import Formatter from "Utils/Formatter";
import UserInfo from "Components/UserInfo/UserInfo";
import IPopulatedAuthor from "Types/IPopulatedAuthor";
import IPostModel from "Types/IPostModel";
import styles from "./Post.module.scss";

interface IProps {
  isPreview?: boolean;
  post: IPostModel;
}

export default class Post extends React.Component<IProps> {
  public render() {
    const { post, isPreview } = this.props;

    if (!post)
      return null;

    const { content = "", pictures = [] } = post.body;
    const { name, picture } = (post.author as unknown as IPopulatedAuthor)
      .profile;

    // "post.author" is, basically, an ID. But we've populated this field with
    // the user's profile when requesting the post from DB.

    // This component has two versions which are chosen by setting "isPreview"
    // prop. If it's "true", then reduced ("preview") version will be rendered.
    return (
      <div className={ [
        styles.Post,
        (isPreview) ? styles.Preview : null
      ].join(" ") }>
        <div className={ styles.Info }>
          <UserInfo name={ name } picture={ picture } />
          <div className={ styles.Date }>
            { post.createdAt && Formatter.formatDate(new Date(post.createdAt)) }
          </div>
        </div>

        <div className={ styles.Header }>
          <NavLink to={ `/posts/${post._id}` }>
            { post.header }
          </NavLink>
        </div>

        <div className={ styles.Body }>
          {
            (pictures && pictures.length === 0) ? null :

              <div className={ styles.Pictures }>
                { pictures }
              </div>
          }

          <div
            className={ styles.Content }
            dangerouslySetInnerHTML={{
              __html: this.createMarkup(content)
            }}
          />
        </div>

        {
          isPreview && <div className={ styles.Expose }>
            <NavLink to={ `/posts/${post._id}` }>
              Читать
            </NavLink>
          </div>
        }

        {
          !isPreview && <div className={ styles.Tags }>
            { post.tags }
          </div>
        }
      </div>
    );
  }

  private createMarkup(content: string, maxLength: number = 1000) {
    if (this.props.isPreview) {
      // First, let's get rid of HTML tags to figure out the actual length
      // of the string.
      const div = document.createElement("div");
      div.innerHTML = content;
      const text = div.textContent || "";

      if (text.length > maxLength)
        return truncate(content, maxLength, {
          ellipsis: "&hellip;",
          keepImageTag: true
        });

      // "htmlTruncate" doesn't count tags when truncating, so their presence
      // in the string shouldn't change the length of the output.
    }

    return content;
    // "content" is HTML which should be sanitized already on back-end.
  }
}
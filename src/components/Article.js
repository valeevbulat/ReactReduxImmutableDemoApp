import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import {
  Item,
  Divider,
} from 'semantic-ui-react';

const Article = ({ article, link, commentsCount }) => {
  if (!article) return false;

  const linkOpt = link ? {
    to: `/articles/${ article.get('id') }`,
    as: Link,
  } : {};
  return (
    <Item key={ article.get('id') }>
      <Item.Content>
        <Item.Header { ...linkOpt }>
          {article.get('title')}
        </Item.Header>
        <Item.Meta> <Link to={ `/user/${ article.get('id') }` } >{ article.get('author').get('name') }</Link></Item.Meta>
        <Item.Description>{article.get('text')}</Item.Description>
        <Item.Extra { ...linkOpt }>
          {commentsCount && `${ article.get('comments').size } Comments`}
        </Item.Extra>
        <Divider />
      </Item.Content>
    </Item>
  );
};

Article.propTypes = {
  link: PropTypes.bool,
  commentsCount: PropTypes.bool,
  article: PropTypes.any,
};

Article.defaultProps = {
  link: false,
  commentsCount: false,
  article: null,
};

export default Article;

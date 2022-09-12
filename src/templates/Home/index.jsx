import { Component } from 'react';

import './styles.css';

import { Posts } from '../../components/Posts';
import { loadData } from '../../utils/load-posts';
import { Button } from '../../components/Button';
import { TextInput } from '../../components/TextInput';

class Home extends Component {
  state = {
    posts: [],
    allPosts: [],
    page: 0,
    postsPerPage: 20,
    searchValue: ''
  }

  async componentDidMount() {
    await this.loadData();
  }

  loadData = async () => {
    const { page, postsPerPage } = this.state;

    const posts = await loadData();

    this.setState({ posts: posts.slice(page, postsPerPage), allPosts: posts });
  }

  loadMorePost = () => {
    const { page, posts, postsPerPage, allPosts } = this.state;

    const nextPage = page + postsPerPage;
    const nextPosts = allPosts.slice(nextPage, nextPage + postsPerPage);

    posts.push(...nextPosts)

    this.setState({ posts, page: nextPage });
  }
  handleChange = (e) => {
    const { value } = e.target;

    this.setState({ searchValue: value });
  }

  render() {
    const { page, posts, postsPerPage, allPosts, searchValue } = this.state;

    const noMorePosts = page + postsPerPage >= allPosts.length;

    const filteredPosts = !!searchValue ? allPosts.filter(post => {
      return post.title.toLowerCase().includes(searchValue.toLowerCase());
    })
      : posts;

    return (
      <section className='container'>
        <div className='search-container'>
          {!!searchValue && (<h1>Search By: {searchValue}</h1>)}

          <TextInput onchange={this.handleChange} searchValue={searchValue} />
        </div>
        {filteredPosts.length > 0 ? (<Posts posts={filteredPosts} />) : (<h2>Not found results</h2>)}

        {!searchValue && (
          <div className='button-container'>
            <Button disabled={noMorePosts} text={'Load more Posts'} onclick={this.loadMorePost} />
          </div>
        )}


      </section>
    )
  }
}

export default Home;

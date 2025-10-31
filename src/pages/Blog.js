import React, { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';
import './Blog.css';
import Header from '../components/Header';
import Footer from '../components/Footer';

// Initialize Supabase
const supabase = createClient(
  process.env.REACT_APP_SUPABASE_URL,
  process.env.REACT_APP_SUPABASE_KEY
);

const Blog = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const [showPasswordPrompt, setShowPasswordPrompt] = useState(false);
  const [passwordInput, setPasswordInput] = useState('');
  const [editingPost, setEditingPost] = useState(null);
  const [creatingNew, setCreatingNew] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    published: false
  });

  useEffect(() => {
    // Check if admin mode requested via URL
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get('admin') === 'true' && !isAdmin) {
      setShowPasswordPrompt(true);
    }
    
    // Check if already authenticated (session storage)
    const adminAuth = sessionStorage.getItem('blog_admin_auth');
    if (adminAuth === 'true') {
      setIsAdmin(true);
    }
    
    fetchPosts();
  }, [isAdmin]);

  const fetchPosts = async () => {
    try {
      let query = supabase
        .from('blog_posts')
        .select('*')
        .order('published_at', { ascending: false });
      
      // If not admin, only show published posts
      if (!isAdmin) {
        query = query.eq('published', true);
      }

      const { data, error } = await query;

      if (error) throw error;

      setPosts(data || []);
    } catch (error) {
      console.error('Error fetching posts:', error);
    } finally {
      setLoading(false);
    }
  };

  const handlePasswordSubmit = (e) => {
    e.preventDefault();
    // Simple password check (you can change this password)
    if (passwordInput === '12345') {
      setIsAdmin(true);
      sessionStorage.setItem('blog_admin_auth', 'true');
      setShowPasswordPrompt(false);
      setPasswordInput('');
      fetchPosts(); // Refetch to show all posts including unpublished
    } else {
      alert('Incorrect password');
      setPasswordInput('');
    }
  };

  const handleLogout = () => {
    setIsAdmin(false);
    sessionStorage.removeItem('blog_admin_auth');
    window.location.href = '/blog';
  };

  const generateSlug = (title) => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-|-$/g, '');
  };

  const handleCreateNew = () => {
    setCreatingNew(true);
    setFormData({
      title: '',
      content: '',
      published: false
    });
  };

  const handleEdit = (post) => {
    setEditingPost(post.id);
    setFormData({
      title: post.title,
      content: post.content,
      published: post.published
    });
  };

  const handleCancelEdit = () => {
    setEditingPost(null);
    setCreatingNew(false);
    setFormData({
      title: '',
      content: '',
      published: false
    });
  };

  const handleSavePost = async () => {
    if (!formData.title.trim() || !formData.content.trim()) {
      alert('Title and content are required');
      return;
    }

    try {
      const slug = generateSlug(formData.title);
      const postData = {
        title: formData.title,
        slug: slug,
        content: formData.content,
        published: formData.published,
        published_at: formData.published ? new Date().toISOString() : null
      };

      if (editingPost) {
        // Update existing post
        const { error } = await supabase
          .from('blog_posts')
          .update(postData)
          .eq('id', editingPost);

        if (error) throw error;
      } else {
        // Create new post
        const { error } = await supabase
          .from('blog_posts')
          .insert([postData]);

        if (error) throw error;
      }

      // Reset form and refetch posts
      handleCancelEdit();
      fetchPosts();
    } catch (error) {
      console.error('Error saving post:', error);
      alert('Error saving post: ' + error.message);
    }
  };

  const handleDeletePost = async (postId) => {
    if (!window.confirm('Are you sure you want to delete this post?')) {
      return;
    }

    try {
      const { error } = await supabase
        .from('blog_posts')
        .delete()
        .eq('id', postId);

      if (error) throw error;

      fetchPosts();
    } catch (error) {
      console.error('Error deleting post:', error);
      alert('Error deleting post: ' + error.message);
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  return (
    <div className="blog">
      <Header />
      
      {/* Password Prompt Modal */}
      {showPasswordPrompt && (
        <div className="admin-modal-overlay">
          <div className="admin-modal">
            <h2 className="admin-modal-title">Admin Access</h2>
            <form onSubmit={handlePasswordSubmit}>
              <input
                type="password"
                value={passwordInput}
                onChange={(e) => setPasswordInput(e.target.value)}
                placeholder="Enter password"
                className="admin-password-input"
                autoFocus
              />
              <div className="admin-modal-buttons">
                <button type="submit" className="admin-button-submit">
                  Login
                </button>
                <button 
                  type="button" 
                  onClick={() => {
                    setShowPasswordPrompt(false);
                    window.location.href = '/blog';
                  }}
                  className="admin-button-cancel"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <section className="blog-content">
        <div className="blog-container">
          {/* Admin Header */}
          {isAdmin && (
            <div className="admin-header">
              <button className="admin-new-post" onClick={handleCreateNew}>
                + New Post
              </button>
              <button className="admin-logout" onClick={handleLogout}>
                Logout
              </button>
            </div>
          )}

          {/* New Post Form */}
          {creatingNew && (
            <div className="post-edit-form">
              <h3 className="form-title">New Post</h3>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => setFormData({...formData, title: e.target.value})}
                placeholder="Post Title"
                className="form-input-title"
              />
              <textarea
                value={formData.content}
                onChange={(e) => setFormData({...formData, content: e.target.value})}
                placeholder="Post content (paste from Google Docs)..."
                className="form-textarea-content"
                rows={15}
              />
              <div className="form-actions">
                <label className="form-checkbox">
                  <input
                    type="checkbox"
                    checked={formData.published}
                    onChange={(e) => setFormData({...formData, published: e.target.checked})}
                  />
                  <span>Publish immediately</span>
                </label>
                <div className="form-buttons">
                  <button onClick={handleSavePost} className="form-button-save">
                    Save Post
                  </button>
                  <button onClick={handleCancelEdit} className="form-button-cancel">
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          )}

          {loading ? (
            <div className="blog-loading">
              <p>Loading posts...</p>
            </div>
          ) : posts.length === 0 ? (
            <div className="blog-empty">
              <h2 className="empty-title">No Posts Yet</h2>
              <p className="empty-subtitle">
                {isAdmin 
                  ? 'Click "New Post" above to create your first post.' 
                  : 'Check back soon for insights on automation and efficiency.'}
              </p>
            </div>
          ) : (
            <div className="blog-posts">
              {posts.map((post) => (
                <article key={post.id} className="blog-post">
                  {editingPost === post.id ? (
                    // Edit Form
                    <div className="post-edit-form">
                      <h3 className="form-title">Edit Post</h3>
                      <input
                        type="text"
                        value={formData.title}
                        onChange={(e) => setFormData({...formData, title: e.target.value})}
                        placeholder="Post Title"
                        className="form-input-title"
                      />
                      <textarea
                        value={formData.content}
                        onChange={(e) => setFormData({...formData, content: e.target.value})}
                        placeholder="Post content..."
                        className="form-textarea-content"
                        rows={15}
                      />
                      <div className="form-actions">
                        <label className="form-checkbox">
                          <input
                            type="checkbox"
                            checked={formData.published}
                            onChange={(e) => setFormData({...formData, published: e.target.checked})}
                          />
                          <span>Published</span>
                        </label>
                        <div className="form-buttons">
                          <button onClick={handleSavePost} className="form-button-save">
                            Save Changes
                          </button>
                          <button onClick={handleCancelEdit} className="form-button-cancel">
                            Cancel
                          </button>
                        </div>
                      </div>
                    </div>
                  ) : (
                    // Display Post
                    <>
                      <div className="post-header">
                        <h2 className="post-title">
                          {post.title}
                          {isAdmin && !post.published && (
                            <span className="post-draft-badge">DRAFT</span>
                          )}
                        </h2>
                        <span className="post-date">{formatDate(post.published_at)}</span>
                      </div>
                      <div className="post-content">
                        {post.content.split('\n').map((paragraph, index) => (
                          paragraph.trim() && <p key={index}>{paragraph}</p>
                        ))}
                      </div>
                      {isAdmin && (
                        <div className="post-admin-actions">
                          <button 
                            onClick={() => handleEdit(post)} 
                            className="post-button-edit"
                          >
                            Edit
                          </button>
                          <button 
                            onClick={() => handleDeletePost(post.id)} 
                            className="post-button-delete"
                          >
                            Delete
                          </button>
                        </div>
                      )}
                    </>
                  )}
                </article>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CTA SECTION - Blog Version */}
      <section className="blog-cta">
        <div className="blog-cta-container">
          <h2 className="blog-cta-title">
            Discover the Possibilities
          </h2>
          <a href="mailto:ben@corradoco.com" className="blog-cta-button">
            Book Your Free Automation Audit
          </a>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Blog;
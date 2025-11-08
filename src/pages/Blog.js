import React, { useState, useEffect, useCallback } from 'react';
import { createClient } from '@supabase/supabase-js';
import ReactMarkdown from 'react-markdown';
import './Blog.css';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Modal from '../components/Modal';

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
  const [selectedPost, setSelectedPost] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    published: false
  });

  const fetchPosts = useCallback(async () => {
    try {
      let query = supabase
        .from('blog_posts')
        .select('*')
        .order('published_at', { ascending: false });
      
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
  }, [isAdmin]);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get('admin') === 'true' && !isAdmin) {
      setShowPasswordPrompt(true);
    }
    
    const adminAuth = sessionStorage.getItem('blog_admin_auth');
    if (adminAuth === 'true') {
      setIsAdmin(true);
    }
    
    fetchPosts();
  }, [isAdmin, fetchPosts]);

  const handlePasswordSubmit = (e) => {
    e.preventDefault();
    if (passwordInput === '12345') {
      setIsAdmin(true);
      sessionStorage.setItem('blog_admin_auth', 'true');
      setShowPasswordPrompt(false);
      setPasswordInput('');
      fetchPosts();
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
    setSelectedPost(null);
    setFormData({
      title: '',
      content: '',
      published: false
    });
  };

  const handleEdit = (post) => {
    setEditingPost(post.id);
    setSelectedPost(null);
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
        const { error } = await supabase
          .from('blog_posts')
          .update(postData)
          .eq('id', editingPost);

        if (error) throw error;
      } else {
        const { error } = await supabase
          .from('blog_posts')
          .insert([postData]);

        if (error) throw error;
      }

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

      setSelectedPost(null);
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

  const createExcerpt = (content, maxLength = 150) => {
    const plainText = content.replace(/[#*\-[\]]/g, '').replace(/\n/g, ' ').trim();
    if (plainText.length <= maxLength) return plainText;
    return plainText.substring(0, maxLength) + '...';
  };

  const handleCardClick = (post) => {
    if (!isAdmin || (!editingPost && !creatingNew)) {
      setSelectedPost(post);
    }
  };

  const handleBackToList = () => {
    setSelectedPost(null);
  };

  // Custom markdown components for styling
  const markdownComponents = {
    h2: ({node, children, ...props}) => <h2 style={{fontFamily: 'Khand, sans-serif', fontSize: '36px', fontWeight: '400', marginTop: '48px', marginBottom: '24px', letterSpacing: '0.02em'}} {...props}>{children}</h2>,
    h3: ({node, children, ...props}) => <h3 style={{fontFamily: 'Khand, sans-serif', fontSize: '28px', fontWeight: '400', marginTop: '36px', marginBottom: '20px', letterSpacing: '0.02em'}} {...props}>{children}</h3>,
    p: ({node, ...props}) => <p style={{marginBottom: '24px', lineHeight: '1.5'}} {...props} />,
    ul: ({node, ...props}) => <ul style={{marginLeft: '24px', marginBottom: '24px'}} {...props} />,
    ol: ({node, ...props}) => <ol style={{marginLeft: '24px', marginBottom: '24px'}} {...props} />,
    li: ({node, ...props}) => <li style={{marginBottom: '12px', lineHeight: '1.5'}} {...props} />,
    strong: ({node, ...props}) => <strong style={{fontWeight: '600'}} {...props} />,
    blockquote: ({node, ...props}) => (
      <blockquote style={{
        borderLeft: '3px solid #1a1a1a',
        paddingLeft: '24px',
        margin: '32px 0',
        fontStyle: 'italic',
        color: '#4a4a4a'
      }} {...props} />
    ),
  };

  // If viewing a single post
  if (selectedPost && !isAdmin) {
    return (
      <div className="blog">
        <Header />
        
        <section className="blog-content">
          <div className="single-post-view">
            <div className="single-post-back" onClick={handleBackToList}>
              ← Back to Blog
            </div>

            <div className="single-post-header">
              <h1 className="single-post-title">{selectedPost.title}</h1>
              <div className="single-post-meta">
                <span className="single-post-date">
                  {formatDate(selectedPost.published_at)}
                </span>
              </div>
            </div>

            <div className="single-post-content">
              <ReactMarkdown components={markdownComponents}>
                {selectedPost.content}
              </ReactMarkdown>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="blog-cta">
          <div className="blog-cta-container">
            <h2 className="blog-cta-title">Ready to Reclaim Your Team's Time?</h2>
            <p className="blog-cta-subtitle">
              See how automation works in your specific business. Free process audit included.
            </p>
            <button className="blog-cta-button" onClick={() => setIsModalOpen(true)}>
              Book Your Discovery Call
            </button>
          </div>
        </section>

        <Footer />

        <Modal 
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          subtitle="See how automation works in your specific business. Free process audit included."
        />
      </div>
    );
  }

  // If admin is viewing a single post
  if (selectedPost && isAdmin && !editingPost) {
    return (
      <div className="blog">
        <Header />
        
        <section className="blog-content">
          <div className="blog-container">
            <div className="admin-header">
              <button className="admin-new-post" onClick={handleCreateNew}>
                + New Post
              </button>
              <button className="admin-logout" onClick={handleLogout}>
                Logout
              </button>
            </div>

            <div className="single-post-view">
              <div className="single-post-back" onClick={handleBackToList}>
                ← Back to Blog
              </div>

              <div className="single-post-header">
                <h1 className="single-post-title">{selectedPost.title}</h1>
                <div className="single-post-meta">
                  <span className="single-post-date">
                    {formatDate(selectedPost.published_at)}
                  </span>
                  {!selectedPost.published && (
                    <span className="post-draft-badge">DRAFT</span>
                  )}
                </div>
              </div>

              <div className="single-post-content">
                <ReactMarkdown components={markdownComponents}>
                  {selectedPost.content}
                </ReactMarkdown>
              </div>

              <div className="post-admin-actions">
                <button 
                  onClick={() => handleEdit(selectedPost)} 
                  className="post-button-edit"
                >
                  Edit
                </button>
                <button 
                  onClick={() => handleDeletePost(selectedPost.id)} 
                  className="post-button-delete"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="blog-cta">
          <div className="blog-cta-container">
            <h2 className="blog-cta-title">Ready to Reclaim Your Team's Time?</h2>
            <p className="blog-cta-subtitle">
              See how automation works in your specific business. Free process audit included.
            </p>
            <button className="blog-cta-button" onClick={() => setIsModalOpen(true)}>
              Book Your Discovery Call
            </button>
          </div>
        </section>

        <Footer />

        <Modal 
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          subtitle="See how automation works in your specific business. Free process audit included."
        />
      </div>
    );
  }

  return (
    <div className="blog">
      <Header />
      
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
                placeholder="Post content (use Markdown for formatting: **bold**, ## Headers, - bullets)"
                className="form-textarea-content"
                rows={15}
              />
              <div className="markdown-help">
                <strong>Markdown Tips:</strong> **bold**, *italic*, ## Section Header, ### Subheader, - bullet, 1. numbered
              </div>
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

          {editingPost && (
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
                placeholder="Post content (use Markdown for formatting)"
                className="form-textarea-content"
                rows={15}
              />
              <div className="markdown-help">
                <strong>Markdown Tips:</strong> **bold**, *italic*, ## Section Header, ### Subheader, - bullet, 1. numbered
              </div>
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
            <div className="blog-posts-grid">
              {posts.map((post) => (
                <div 
                  key={post.id} 
                  className="blog-card"
                  onClick={() => handleCardClick(post)}
                >
                  <div className="blog-card-content">
                    <div className="blog-card-header">
                      <h2 className="blog-card-title">
                        {post.title}
                        {isAdmin && !post.published && (
                          <span className="post-draft-badge">DRAFT</span>
                        )}
                      </h2>
                      <span className="blog-card-date">
                        {formatDate(post.published_at)}
                      </span>
                    </div>
                    <p className="blog-card-excerpt">
                      {createExcerpt(post.content)}
                    </p>
                    <span className="blog-card-read-more">
                      Read More →
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="blog-cta">
        <div className="blog-cta-container">
          <h2 className="blog-cta-title">Ready to Reclaim Your Team's Time?</h2>
          <p className="blog-cta-subtitle">
            See how automation works in your specific business. Free process audit included.
          </p>
          <button className="blog-cta-button" onClick={() => setIsModalOpen(true)}>
            Book Your Discovery Call
          </button>
        </div>
      </section>

      <Footer />

      <Modal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        subtitle="See how automation works in your specific business. Free process audit included."
      />
    </div>
  );
};

export default Blog;
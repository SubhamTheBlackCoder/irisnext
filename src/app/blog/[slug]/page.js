"use client";
import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Head from 'next/head';
import Link from 'next/link';
import {
  ArrowLeftIcon,
  CalendarIcon,
  ClockIcon,
  UserIcon,
  TagIcon,
} from "@heroicons/react/24/outline";
import '../Blog.css'
import { blogPosts } from '@/data/blogData';

export default function BlogPostPage() {
  const router = useRouter();
  const { slug } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    const foundPost = blogPosts.find((p) => p.slug === slug);
    
    if (foundPost) {
      setPost(foundPost);
    } else {
      setNotFound(true);
    }
    
    setLoading(false);
  }, [slug]);

  if (loading) {
    return (
      <div className="blog-page container">
        <div className="loading-spinner">
          <div className="spinner"></div>
          <p>Loading article...</p>
        </div>
      </div>
    );
  }

  if (notFound || !post) {
    return (
      <div className="blog-page">
        <div className="container blog-container">
          <div className="blog-detail">
            <Head>
              <title>Post Not Found | Irisnex Career Blog</title>
              <meta name="robots" content="noindex" />
            </Head>
            <h2 className="not-found-title">Post Not Found</h2>
            <p className="not-found-text">
              The requested article doesn't exist or has been removed.
            </p>
            <Link href="/blog" className="back-button">
              <ArrowLeftIcon className="back-icon" />
              Back to all posts
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <>
      <Head>
        <title>{post.title} | Irisnex Career Blog</title>
        <meta name="description" content={post.excerpt} />
        <link
          rel="canonical"
          href={`https://www.irisnex.com/blog/${post.slug}`}
        />
      </Head>

      <div className="blog-page">
        <div className="container blog-container">
          <div className="blog-detail">
            <Link href="/blog" className="back-button">
              <ArrowLeftIcon className="back-icon" />
              Back to all posts
            </Link>

            <div className="post-header">
              <span className="post-category">{post.category}</span>
              <h1 className="post-title">{post.title}</h1>
              <div className="post-meta">
                <div className="meta-item">
                  <UserIcon className="meta-icon" />
                  <span>{post.author}</span>
                </div>
                <div className="meta-item">
                  <CalendarIcon className="meta-icon" />
                  <span>{post.date}</span>
                </div>
                <div className="meta-item">
                  <ClockIcon className="meta-icon" />
                  <span>{post.readTime}</span>
                </div>
              </div>
            </div>

            <div className="post-image">
              <img src={`/images/blog/${post.image}`} alt={post.title} />
            </div>

            <div
              className="post-content"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />

            <div className="post-tags">
              <TagIcon className="tag-icon" />
              {post.tags.map((tag, index) => (
                <span key={index} className="tag">
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

    </>
  );
}
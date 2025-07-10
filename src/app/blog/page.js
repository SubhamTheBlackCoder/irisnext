"use client";
import { useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  CalendarIcon,
  ClockIcon,
  MagnifyingGlassIcon,
  ArrowSmallRightIcon,
} from "@heroicons/react/24/outline";
import './Blog.css'
import { blogPosts, categories } from '@/data/blogData'

export default function BlogListPage() {
  const [selectedCategory, setSelectedCategory] = useState("All Posts");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredPosts = blogPosts.filter((post) => {
    const matchesCategory =
      selectedCategory === "All Posts" || post.category === selectedCategory;
    const matchesSearch =
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <>
      <Head>
        <title>Irisnex Career Blog – Resume Tips, ATS Score, Job Advice</title>
        <meta
          name="description"
          content="Explore expert-written blogs on resume mistakes, ATS optimization, job search strategies, and more with Irisnex Career Blog."
        />
        <link rel="canonical" href="https://www.irisnex.com/blog" />
      </Head>

      <div className="blog-page">
        <section className="blog-hero">
          <div className="container">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="hero-content"
            >
              <h1 className="hero-title">Career Insights & Resume Tips</h1>
              <p className="hero-subtitle">
                Expert advice to optimize your resume, ace interviews, and
                advance your career
              </p>
            </motion.div>
          </div>
        </section>

        <div className="container blog-container">
          <div className="blog-navigation">
            <div className="search-container">
              <div className="search-input">
                <MagnifyingGlassIcon className="search-icon" />
                <input
                  type="text"
                  placeholder="Search blog posts..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>

            <div className="category-filters">
              {categories.map((category, index) => (
                <button
                  key={index}
                  className={`category-btn ${
                    selectedCategory === category ? "active" : ""
                  }`}
                  onClick={() => setSelectedCategory(category)}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          <div className="blog-grid">
            {filteredPosts.length > 0 ? (
              filteredPosts.map((post) => (
                <Link
                  href={`/blog/${post.slug}`}
                  key={post.id}
                  className="blog-card-link"
                >
                  <motion.div
                    className="blog-card"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4 }}
                    whileHover={{ y: -5 }}
                  >
                    <div className="card-image">
                      <img src={`/images/blog/${post.image}`} alt={post.title} />
                    </div>
                    <div className="card-content">
                      <span className="card-category">{post.category}</span>
                      <h3 className="card-title">{post.title}</h3>
                      <p className="card-excerpt">{post.excerpt}</p>
                      <div className="card-meta">
                        <div className="meta-item">
                          <CalendarIcon className="meta-icon" />
                          <span>{post.date}</span>
                        </div>
                        <div className="meta-item">
                          <ClockIcon className="meta-icon" />
                          <span>{post.readTime}</span>
                        </div>
                      </div>
                      <div className="read-more">
                        Read full article
                        <ArrowSmallRightIcon className="arrow-icon" />
                      </div>
                    </div>
                  </motion.div>
                </Link>
              ))
            ) : (
              <div className="no-results">
                <h3>No posts found</h3>
                <p>Try adjusting your search or filter criteria</p>
              </div>
            )}
          </div>
        </div>
      </div>
   
    </>
  );
}
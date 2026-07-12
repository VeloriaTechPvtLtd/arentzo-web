import React, { useState, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { WaitlistPageShell } from '../../../landing/ui/components/WaitlistPageShell';
import '../styles/BusinessPages.css';

interface BlogPost {
    id: string;
    title: string;
    excerpt: string;
    image: string;
    author: string;
    role: string;
    date: string;
    readTime: string;
    category: string;
    featured: boolean;
}

const CATEGORY_KEYS = [
    'all',
    'productUpdates',
    'sellerTips',
    'industryInsights',
    'companyNews',
    'engineering'
] as const;

const CategoryFilters: React.FC<{
    activeCategory: string;
    onSelectCategory: (category: string) => void;
}> = ({ activeCategory, onSelectCategory }) => {
    const { t } = useTranslation();

    return (
        <section className="blog-filters">
            <div className="blog-filters__inner">
                {CATEGORY_KEYS.map((key) => (
                    <button
                        key={key}
                        className={`blog-filters__button ${activeCategory === key ? 'blog-filters__button--active' : ''}`}
                        onClick={() => onSelectCategory(key)}
                    >
                        {t(`blog.categories.${key}`)}
                    </button>
                ))}
            </div>
        </section>
    );
};

const FeaturedPostCard: React.FC<{
    post: BlogPost;
    onNavigate: (id: string) => void;
}> = ({ post, onNavigate }) => {
    const { t } = useTranslation();

    return (
        <article
            className="blog-posts__card blog-posts__card--featured"
            onClick={() => onNavigate(post.id)}
            role="link"
            tabIndex={0}
        >
            <div className="blog-posts__card-image">
                <img
                    src={post.image}
                    alt={post.title}
                    className="blog-posts__card-img"
                />
                <span className="blog-posts__featured-tag">
                    {t('blog.featured.tag')}
                </span>
            </div>
            <div className="blog-posts__card-body">
                <span className="blog-posts__card-category">
                    {t(`blog.categories.${post.category}`)}
                </span>
                <h3 className="blog-posts__card-title">{post.title}</h3>
                <p className="blog-posts__card-excerpt">{post.excerpt}</p>
                <div className="blog-posts__card-footer">
                    <div>
                        <div className="blog-posts__author-name">{post.author}</div>
                        {post.role && (
                            <div className="blog-posts__author-role">{post.role}</div>
                        )}
                    </div>
                    <div className="blog-posts__card-date">
                        <div>{post.date}</div>
                        <div className="blog-posts__read-time">
                            {post.readTime} {t('blog.featured.readTime')}
                        </div>
                    </div>
                </div>
            </div>
        </article>
    );
};

const PostCard: React.FC<{
    post: BlogPost;
    onNavigate: (id: string) => void;
}> = ({ post, onNavigate }) => {
    const { t } = useTranslation();

    return (
        <article
            className="blog-posts__card"
            onClick={() => onNavigate(post.id)}
            role="link"
            tabIndex={0}
        >
            <div className="blog-posts__card-image">
                <img
                    src={post.image}
                    alt={post.title}
                    className="blog-posts__card-img"
                />
            </div>
            <div className="blog-posts__card-body">
                <span className="blog-posts__card-category">
                    {t(`blog.categories.${post.category}`)}
                </span>
                <h3 className="blog-posts__card-title">{post.title}</h3>
                <p className="blog-posts__card-excerpt">{post.excerpt}</p>
                <div className="blog-posts__card-footer">
                    <div>
                        <div className="blog-posts__author-name">{post.author}</div>
                        {post.role && (
                            <div className="blog-posts__author-role">{post.role}</div>
                        )}
                    </div>
                    <div className="blog-posts__card-date">
                        <div>{post.date}</div>
                        <div className="blog-posts__read-time">
                            {post.readTime} {t('blog.featured.readTime')}
                        </div>
                    </div>
                </div>
            </div>
        </article>
    );
};

const NewsletterSection: React.FC = () => {
    const { t } = useTranslation();

    return (
        <section className="newsletter-section">
            <div className="newsletter-section__card">
                <div className="newsletter-section__blob" />
                <h2 className="newsletter-section__title">
                    {t('blog.newsletter.title')}
                </h2>
                <p className="newsletter-section__desc">
                    {t('blog.newsletter.description')}
                </p>
                <form
                    className="newsletter-section__form"
                    onSubmit={(e) => e.preventDefault()}
                >
                    <input
                        type="email"
                        className="newsletter-section__input"
                        placeholder={t('blog.newsletter.placeholder')}
                    />
                    <button type="submit" className="newsletter-section__button">
                        {t('blog.newsletter.button')}
                    </button>
                </form>
                <p className="newsletter-section__disclaimer">
                    {t('blog.newsletter.disclaimer')}
                </p>
            </div>
        </section>
    );
};

export const BlogPage: React.FC = () => {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const [activeCategory, setActiveCategory] = useState('all');

    const allPosts = t('blog.posts', { returnObjects: true }) as BlogPost[];

    const filteredPosts = useMemo(() => {
        if (activeCategory === 'all') return allPosts;
        return allPosts.filter((post) => post.category === activeCategory);
    }, [allPosts, activeCategory]);

    const featuredPost = filteredPosts.find((post) => post.featured);
    const regularPosts = filteredPosts.filter((post) => !post.featured);

    const navigateToPost = (postId: string) => {
        navigate(`/blog/${postId}`);
    };

    return (
        <WaitlistPageShell>
        <main>
            <section className="business-hero">
                <div className="business-hero__blob-1" />
                <div className="business-hero__blob-2" />
                <div className="business-hero__inner">
                    <h1 className="business-hero__title">
                        {t('blog.hero.title')}
                    </h1>
                    <p className="business-hero__subtitle">
                        {t('blog.hero.subtitle')}
                    </p>
                    <button className="business-hero__cta">
                        {t('blog.hero.cta')}
                        <ArrowRight size={18} />
                    </button>
                </div>
            </section>

            <CategoryFilters
                activeCategory={activeCategory}
                onSelectCategory={setActiveCategory}
            />

            <section className="blog-posts">
                <div className="blog-posts__inner">
                    <div className="blog-posts__grid">
                        {featuredPost && (
                            <FeaturedPostCard
                                post={featuredPost}
                                onNavigate={navigateToPost}
                            />
                        )}
                        {regularPosts.map((post) => (
                            <PostCard
                                key={post.id}
                                post={post}
                                onNavigate={navigateToPost}
                            />
                        ))}
                    </div>
                </div>
            </section>

            <NewsletterSection />
        </main>
        </WaitlistPageShell>
    );
};

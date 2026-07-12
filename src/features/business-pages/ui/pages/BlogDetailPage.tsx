'use client';

import React, { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useParams, useRouter } from 'next/navigation';
import {
    ArrowLeft, Clock, Calendar, Share2,
    Link2, ArrowRight,
} from 'lucide-react';
import { WaitlistPageShell } from '../../../landing/ui/components/WaitlistPageShell';
import { useReadingProgress } from '../hooks/useReadingProgress';
import { parseMarkdownText } from '../utils/parseMarkdownText';
import '../styles/BlogDetailPage.css';

interface BlogContentSection {
    heading: string;
    body: string;
}

interface BlogPostDetail {
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
    content: BlogContentSection[];
}

const ReadingProgressBar: React.FC<{ progress: number }> = ({ progress }) => (
    <div className="blog-progress">
        <div
            className="blog-progress__bar"
            style={{ width: `${progress}%` }}
        />
    </div>
);

const ArticleHeader: React.FC<{
    post: BlogPostDetail;
    categoryLabel: string;
    readTimeLabel: string;
    onBack: () => void;
    backLabel: string;
}> = ({ post, categoryLabel, readTimeLabel, onBack, backLabel }) => (
    <header className="blog-detail__header">
        <button className="blog-detail__back" onClick={onBack}>
            <ArrowLeft size={18} />
            {backLabel}
        </button>
        <div className="blog-detail__badge-row">
            <span className="blog-detail__category-badge">
                {categoryLabel}
            </span>
            <span className="blog-detail__read-badge">
                <Clock size={13} />
                {post.readTime} {readTimeLabel}
            </span>
        </div>
        <h1 className="blog-detail__title">{post.title}</h1>
        <p className="blog-detail__excerpt">{post.excerpt}</p>
        <div className="blog-detail__meta">
            <div className="blog-detail__author-info">
                <div className="blog-detail__author-avatar">
                    {post.author.charAt(0)}
                </div>
                <div>
                    <div className="blog-detail__author-name">
                        {post.author}
                    </div>
                    {post.role && (
                        <div className="blog-detail__author-role">
                            {post.role}
                        </div>
                    )}
                </div>
            </div>
            <div className="blog-detail__date-label">
                <Calendar size={14} />
                {post.date}
            </div>
        </div>
    </header>
);

const TableOfContents: React.FC<{
    sections: BlogContentSection[];
    title: string;
}> = ({ sections, title }) => (
    <nav className="blog-toc">
        <h3 className="blog-toc__title">{title}</h3>
        <ol className="blog-toc__list">
            {sections.map((section, index) => (
                <li key={index} className="blog-toc__item">
                    <a
                        href={`#section-${index}`}
                        className="blog-toc__link"
                    >
                        {section.heading}
                    </a>
                </li>
            ))}
        </ol>
    </nav>
);

const ArticleCoverImage: React.FC<{
    image: string;
    title: string;
}> = ({ image, title }) => (
    <div className="blog-detail__cover">
        <img
            src={image}
            alt={title}
            className="blog-detail__cover-img"
        />
    </div>
);

const ArticleContentSection: React.FC<{
    section: BlogContentSection;
    index: number;
}> = ({ section, index }) => (
    <section className="blog-detail__section" id={`section-${index}`}>
        <h2 className="blog-detail__section-heading">
            {section.heading}
        </h2>
        <div className="blog-detail__section-body">
            {section.body.split('\n\n').map((paragraph, paragraphIndex) => (
                <p key={paragraphIndex}>
                    {parseMarkdownText(paragraph)}
                </p>
            ))}
        </div>
    </section>
);

const SocialShareBar: React.FC<{ shareLabel: string }> = ({ shareLabel }) => {
    const handleCopyLink = () => {
        navigator.clipboard.writeText(window.location.href);
    };

    const handleShareNative = () => {
        if (!navigator.share) return;
        navigator.share({
            title: document.title,
            url: window.location.href,
        });
    };

    const isNativeShareAvailable = typeof navigator.share === 'function';

    return (
        <div className="blog-share">
            <span className="blog-share__label">{shareLabel}</span>
            <div className="blog-share__buttons">
                <button
                    className="blog-share__button"
                    onClick={handleCopyLink}
                    title="Copy link"
                >
                    <Link2 size={16} />
                </button>
                {isNativeShareAvailable && (
                    <button
                        className="blog-share__button blog-share__button--primary"
                        onClick={handleShareNative}
                        title="Share"
                    >
                        <Share2 size={16} />
                    </button>
                )}
            </div>
        </div>
    );
};

const AuthorBioCard: React.FC<{
    author: string;
    role: string;
}> = ({ author, role }) => (
    <div className="blog-author-card">
        <div className="blog-author-card__avatar">
            {author.charAt(0)}
        </div>
        <div className="blog-author-card__info">
            <div className="blog-author-card__label">Written by</div>
            <div className="blog-author-card__name">{author}</div>
            {role && (
                <div className="blog-author-card__role">{role}</div>
            )}
        </div>
    </div>
);

const RelatedPostCard: React.FC<{
    post: BlogPostDetail;
    categoryLabel: string;
    readTimeLabel: string;
    onNavigate: (id: string) => void;
}> = ({ post, categoryLabel, readTimeLabel, onNavigate }) => (
    <article
        className="blog-related__card"
        onClick={() => onNavigate(post.id)}
        role="link"
        tabIndex={0}
    >
        <div className="blog-related__card-image">
            <img
                src={post.image}
                alt={post.title}
                className="blog-related__card-img"
            />
        </div>
        <div className="blog-related__card-body">
            <span className="blog-related__card-category">
                {categoryLabel}
            </span>
            <h3 className="blog-related__card-title">{post.title}</h3>
            <div className="blog-related__card-footer">
                <span className="blog-related__card-author">
                    {post.author}
                </span>
                <span className="blog-related__card-read">
                    {post.readTime} {readTimeLabel}
                </span>
            </div>
            <span className="blog-related__card-arrow">
                <ArrowRight size={16} />
            </span>
        </div>
    </article>
);

export const BlogDetailPage: React.FC = () => {
    const { t } = useTranslation();
    const { slug } = useParams() as { slug: string };
    const router = useRouter();
    const readingProgress = useReadingProgress();

    const allPosts = t('blog.posts', {
        returnObjects: true,
    }) as BlogPostDetail[];

    const currentPost = allPosts.find((post) => post.id === slug);

    const relatedPosts = useMemo(() => {
        if (!currentPost) return [];

        const sameCategoryPosts = allPosts
            .filter((post) => post.id !== currentPost.id)
            .filter((post) => post.category === currentPost.category);

        if (sameCategoryPosts.length >= 3) {
            return sameCategoryPosts.slice(0, 3);
        }

        const remainingPosts = allPosts
            .filter((post) => post.id !== currentPost.id)
            .filter((post) => post.category !== currentPost.category);

        return [...sameCategoryPosts, ...remainingPosts].slice(0, 3);
    }, [allPosts, currentPost]);

    const navigateToPost = (postId: string) => {
        router.push(`/blog/${postId}`);
        window.scrollTo(0, 0);
    };

    if (!currentPost) {
        return (
            <WaitlistPageShell>
            <main className="blog-detail">
                <div className="blog-detail__not-found">
                    <h1>{t('blog.hero.title')}</h1>
                    <p>Article not found.</p>
                    <button
                        className="business-hero__cta"
                        onClick={() => router.push('/blog')}
                    >
                        {t('blog.detail.backToArticles')}
                    </button>
                </div>
            </main>
            </WaitlistPageShell>
        );
    }

    return (
        <WaitlistPageShell>
        <main className="blog-detail">
            <ReadingProgressBar progress={readingProgress} />

            <div className="blog-detail__container">
                <ArticleHeader
                    post={currentPost}
                    categoryLabel={
                        t(`blog.categories.${currentPost.category}`)
                    }
                    readTimeLabel={t('blog.featured.readTime')}
                    onBack={() => router.push('/blog')}
                    backLabel={t('blog.detail.backToArticles')}
                />

                <ArticleCoverImage
                    image={currentPost.image}
                    title={currentPost.title}
                />

                <TableOfContents
                    sections={currentPost.content}
                    title={t('blog.detail.tableOfContents')}
                />

                <article className="blog-detail__content">
                    {currentPost.content.map((section, index) => (
                        <ArticleContentSection
                            key={index}
                            section={section}
                            index={index}
                        />
                    ))}
                </article>

                <SocialShareBar
                    shareLabel={t('blog.detail.shareArticle')}
                />

                <AuthorBioCard
                    author={currentPost.author}
                    role={currentPost.role}
                />

                {relatedPosts.length > 0 && (
                    <section className="blog-detail__related">
                        <h2 className="blog-detail__related-title">
                            {t('blog.detail.relatedPosts')}
                        </h2>
                        <div className="blog-detail__related-grid">
                            {relatedPosts.map((post) => (
                                <RelatedPostCard
                                    key={post.id}
                                    post={post}
                                    categoryLabel={
                                        t(`blog.categories.${post.category}`)
                                    }
                                    readTimeLabel={
                                        t('blog.featured.readTime')
                                    }
                                    onNavigate={navigateToPost}
                                />
                            ))}
                        </div>
                    </section>
                )}
            </div>
        </main>
        </WaitlistPageShell>
    );
};

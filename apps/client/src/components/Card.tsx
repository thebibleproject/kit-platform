import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const CardContainer = styled.article`
    width: 100%;
    display: grid;
    grid-template-columns: 1fr;
    grid-gap: 12px;

    h1 {
        font-size: 18px;
    }
`;

const ImageContainer = styled.div`
    position: relative;
    width: 100%;
    aspect-ratio: 16/9;
    overflow: hidden;
    border-radius: 8px;
    object-fit: cover;

    img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        position: absolute;
        top: 0;
        left: 0;
    }
`;

export const Card = ({
    title,
    image,
    slug,
    type,
    description = '',
}: {
    title: string;
    image: string;
    slug: string;
    type: 'article' | 'video';
    description?: string;
}) => {
    return (
        <Link to={`/${type}s/${slug}`}>
            <CardContainer>
                <ImageContainer>
                    <img src={image} alt={title} />
                </ImageContainer>
                <h1>{title}</h1>
                {description && (
                    <p>{description.slice(0, 240).trim() + ' ...'}</p>
                )}
            </CardContainer>
        </Link>
    );
};

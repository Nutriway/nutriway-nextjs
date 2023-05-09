'use client';
import React from 'react';
import { InstagramEmbed } from 'react-social-media-embed';

export default function Instagram() {
    return (
        <div style={{ display: 'flex', justifyContent: 'center' }}>
            <InstagramEmbed url="https://www.instagram.com/p/CqD1KwKohhq/" width={328} />
        </div>
    );
}

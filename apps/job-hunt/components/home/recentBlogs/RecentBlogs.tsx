
import { BlogCard } from '@/components/blogs/blogCard/BlogCard';
import { ClCol, ClContainer, ClRow, ClSection } from '@codelab/ui';
import React from 'react';

export const RecentBlogs = () => {
  return (
    <ClSection heading='From Our Blogs'>
      <ClContainer>
        <ClRow>
          <ClCol xs={8}>
            <BlogCard />
          </ClCol>
          <ClCol xs={8}>
          <BlogCard />
          </ClCol>
          <ClCol xs={8}>
          <BlogCard />
          </ClCol>
        </ClRow>
      </ClContainer>
    </ClSection>
  );
};



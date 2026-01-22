// third-party
import { FormattedMessage } from 'react-intl';

// assets
import { Book, PasswordCheck, Next, RowVertical, CpuCharge, TableDocument, Subtitle } from 'iconsax-react';

// type

// icons
const icons = {
  formsTable: Book,
  validation: PasswordCheck,
  wizard: Next,
  layout: RowVertical,
  plugins: CpuCharge,
  reactTables: TableDocument,
  muiTables: Subtitle
};

// ==============================|| MENU ITEMS - FORMS & TABLES ||============================== //

const formsTables = {
  id: 'group-cristalex-management',
  title: <FormattedMessage id="CristAlex Dent Management" />,
  icon: icons.formsTable,
  type: 'group',
  children: [
    {
      id: 'blog-management',
      title: <FormattedMessage id="Blog Management" />,
      type: 'collapse',
      icon: icons.wizard,
      children: [
        {
          id: 'add-blog',
          title: <FormattedMessage id="Add Blog Article" />,
          type: 'item',
          url: '/forms/blog',
          icon: icons.wizard
        },
        {
          id: 'list-blogs',
          title: <FormattedMessage id="Blog Articles List" />,
          type: 'item',
          url: '/tables/blogs',
          icon: icons.reactTables
        }
      ]
    },
    {
      id: 'team-management',
      title: <FormattedMessage id="Team Members" />,
      type: 'collapse',
      icon: icons.wizard,
      children: [
        {
          id: 'add-team',
          title: <FormattedMessage id="Add Team Member" />,
          type: 'item',
          url: '/forms/team',
          icon: icons.wizard
        },
        {
          id: 'list-team',
          title: <FormattedMessage id="Team Members List" />,
          type: 'item',
          url: '/tables/team',
          icon: icons.reactTables
        }
      ]
    },
    {
      id: 'services-management',
      title: <FormattedMessage id="Services" />,
      type: 'collapse',
      icon: icons.wizard,
      children: [
        {
          id: 'add-service',
          title: <FormattedMessage id="Add Service" />,
          type: 'item',
          url: '/forms/services',
          icon: icons.wizard
        },
        {
          id: 'list-services',
          title: <FormattedMessage id="Services List" />,
          type: 'item',
          url: '/tables/services',
          icon: icons.reactTables
        }
      ]
    },
    {
      id: 'testimonials-management',
      title: <FormattedMessage id="Testimonials" />,
      type: 'collapse',
      icon: icons.wizard,
      children: [
        {
          id: 'add-testimonial',
          title: <FormattedMessage id="Add Testimonial" />,
          type: 'item',
          url: '/forms/testimonials',
          icon: icons.wizard
        },
        {
          id: 'list-testimonials',
          title: <FormattedMessage id="Testimonials List" />,
          type: 'item',
          url: '/tables/testimonials',
          icon: icons.reactTables
        }
      ]
    },
    {
      id: 'social-media-management',
      title: <FormattedMessage id="Social Media Posts" />,
      type: 'collapse',
      icon: icons.wizard,
      children: [
        {
          id: 'add-social-media',
          title: <FormattedMessage id="Add Social Media Post" />,
          type: 'item',
          url: '/forms/social-media',
          icon: icons.wizard
        },
        {
          id: 'list-social-media',
          title: <FormattedMessage id="Social Media Posts List" />,
          type: 'item',
          url: '/tables/social-media',
          icon: icons.reactTables
        }
      ]
    },
    {
      id: 'before-after-management',
      title: <FormattedMessage id="Before/After Gallery" />,
      type: 'collapse',
      icon: icons.wizard,
      children: [
        {
          id: 'add-before-after',
          title: <FormattedMessage id="Add Before/After" />,
          type: 'item',
          url: '/forms/before-after',
          icon: icons.wizard
        },
        {
          id: 'list-before-after',
          title: <FormattedMessage id="Before/After List" />,
          type: 'item',
          url: '/tables/before-after',
          icon: icons.reactTables
        }
      ]
    },
    {
      id: 'gallery-media-management',
      title: <FormattedMessage id="Gallery Media" />,
      type: 'collapse',
      icon: icons.wizard,
      children: [
        {
          id: 'add-gallery-media',
          title: <FormattedMessage id="Add Media" />,
          type: 'item',
          url: '/forms/gallery-media',
          icon: icons.wizard
        },
        {
          id: 'list-gallery-media',
          title: <FormattedMessage id="Gallery Media List" />,
          type: 'item',
          url: '/tables/gallery-media',
          icon: icons.reactTables
        }
      ]
    }
  ]
};

export default formsTables;

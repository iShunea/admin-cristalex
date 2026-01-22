import { lazy } from 'react';

// project-imports
import ErrorBoundary from './ErrorBoundary';
import Loadable from 'components/Loadable';
import DashboardLayout from 'layout/Dashboard';
import PagesLayout from 'layout/Pages';
import { loader as productsLoader, productLoader } from 'api/products';
import FormJobs from 'pages/forms/jobs';
import FormEditJobs from 'pages/edit-form-grids/jobs';
import FormEditTeam from 'pages/edit-form-grids/team';
import FormEditWorks from 'pages/edit-form-grids/works';
import FormEditSocialMedia from 'pages/edit-form-grids/social-media';
import FormEditBeforeAfter from 'pages/edit-form-grids/before-after';
import FormEditGalleryMedia from 'pages/edit-form-grids/gallery-media';

// // render - dashboard
// const DashboardDefault = Loadable(lazy(() => import('pages/dashboard/default')));
// const DashboardAnalytics = Loadable(lazy(() => import('pages/dashboard/analytics')));

// // render - widget
// const WidgetStatistics = Loadable(lazy(() => import('pages/widget/statistics')));
// const WidgetData = Loadable(lazy(() => import('pages/widget/data')));
// const WidgetChart = Loadable(lazy(() => import('pages/widget/chart')));

// render - applications
const AppChat = Loadable(lazy(() => import('pages/apps/chat')));
const AppCalendar = Loadable(lazy(() => import('pages/apps/calendar')));

const AppKanban = Loadable(lazy(() => import('pages/apps/kanban')));
const AppKanbanBacklogs = Loadable(lazy(() => import('sections/apps/kanban/Backlogs')));
const AppKanbanBoard = Loadable(lazy(() => import('sections/apps/kanban/Board')));

const AppCustomerList = Loadable(lazy(() => import('pages/apps/customer/list')));
const AppCustomerCard = Loadable(lazy(() => import('pages/apps/customer/card')));

const AppInvoiceCreate = Loadable(lazy(() => import('pages/apps/invoice/create')));
const AppInvoiceDashboard = Loadable(lazy(() => import('pages/apps/invoice/dashboard')));
const AppInvoiceList = Loadable(lazy(() => import('pages/apps/invoice/list')));
const AppInvoiceDetails = Loadable(lazy(() => import('pages/apps/invoice/details')));
const AppInvoiceEdit = Loadable(lazy(() => import('pages/apps/invoice/edit')));

const UserProfile = Loadable(lazy(() => import('pages/apps/profiles/user')));
const UserTabPersonal = Loadable(lazy(() => import('sections/apps/profiles/user/TabPersonal')));
const UserTabPayment = Loadable(lazy(() => import('sections/apps/profiles/user/TabPayment')));
const UserTabPassword = Loadable(lazy(() => import('sections/apps/profiles/user/TabPassword')));
const UserTabSettings = Loadable(lazy(() => import('sections/apps/profiles/user/TabSettings')));

const AccountProfile = Loadable(lazy(() => import('pages/apps/profiles/account')));
const AccountTabProfile = Loadable(lazy(() => import('sections/apps/profiles/account/TabProfile')));
const AccountTabPersonal = Loadable(lazy(() => import('sections/apps/profiles/account/TabPersonal')));
const AccountTabPassword = Loadable(lazy(() => import('sections/apps/profiles/account/TabPassword')));
const AccountTabSettings = Loadable(lazy(() => import('sections/apps/profiles/account/TabSettings')));

const AppECommProducts = Loadable(lazy(() => import('pages/apps/e-commerce/product')));
const AppECommProductDetails = Loadable(lazy(() => import('pages/apps/e-commerce/product-details')));
const AppECommProductList = Loadable(lazy(() => import('pages/apps/e-commerce/products-list')));
const AppECommCheckout = Loadable(lazy(() => import('pages/apps/e-commerce/checkout')));
const AppECommAddProduct = Loadable(lazy(() => import('pages/apps/e-commerce/add-product')));

// render - forms & tables
const FormServices = Loadable(lazy(() => import('pages/forms/services')));
const FormTeam = Loadable(lazy(() => import('pages/forms/team')));
const FormBlog = Loadable(lazy(() => import('pages/forms/blogs')));
const FormWork = Loadable(lazy(() => import('pages/forms/work')));
const FormSpecialOffer = Loadable(lazy(() => import('pages/forms/special-offer')));
const FormEditBlog = Loadable(lazy(() => import('pages/edit-form-grids/blogs.jsx')));
const FormEditServices = Loadable(lazy(() => import('pages/edit-form-grids/services.jsx')));
const FormTestimonials = Loadable(lazy(() => import('pages/forms/testimonials')));
const FormSocialMedia = Loadable(lazy(() => import('pages/forms/social-media')));
const FormBeforeAfter = Loadable(lazy(() => import('pages/forms/before-after')));
const FormGalleryMedia = Loadable(lazy(() => import('pages/forms/gallery-media')));

const ReactTableServices = Loadable(lazy(() => import('pages/tables/services-sorting')));
const ReactTableJobs = Loadable(lazy(() => import('pages/tables/jobs-sorting')));
const ReactTableTeam = Loadable(lazy(() => import('pages/tables/team-sorting')));
const ReactTableBlogs = Loadable(lazy(() => import('pages/tables/blogs-sorting')));
const ReactTableWorks = Loadable(lazy(() => import('pages/tables/works-sorting')));
const ReactTableTestimonials = Loadable(lazy(() => import('pages/tables/testimonials-sorting')));
const ReactTableSocialMedia = Loadable(lazy(() => import('pages/tables/social-media-sorting')));
const ReactTableBeforeAfter = Loadable(lazy(() => import('pages/tables/before-after-sorting')));
const ReactTableGalleryMedia = Loadable(lazy(() => import('pages/tables/gallery-media-sorting')));

const TeamMemberDetail = Loadable(lazy(() => import('pages/team-member-detail')));

// render - charts & map
const ChartApexchart = Loadable(lazy(() => import('pages/charts/apexchart')));
const ChartOrganization = Loadable(lazy(() => import('pages/charts/org-chart')));
const Map = Loadable(lazy(() => import('pages/map')));

// pages routing
const AuthLogin = Loadable(lazy(() => import('pages/auth/auth1/login')));
const AuthRegister = Loadable(lazy(() => import('pages/auth/auth1/register')));
const AuthForgotPassword = Loadable(lazy(() => import('pages/auth/auth1/forgot-password')));
const AuthResetPassword = Loadable(lazy(() => import('pages/auth/auth1/reset-password')));
const AuthCheckMail = Loadable(lazy(() => import('pages/auth/auth1/check-mail')));
const AuthCodeVerification = Loadable(lazy(() => import('pages/auth/auth1/code-verification')));

const AuthLogin2 = Loadable(lazy(() => import('pages/auth/auth2/login2')));
const AuthRegister2 = Loadable(lazy(() => import('pages/auth/auth2/register2')));
const AuthForgotPassword2 = Loadable(lazy(() => import('pages/auth/auth2/forgot-password2')));
const AuthResetPassword2 = Loadable(lazy(() => import('pages/auth/auth2/reset-password2')));
const AuthCheckMail2 = Loadable(lazy(() => import('pages/auth/auth2/check-mail2')));
const AuthCodeVerification2 = Loadable(lazy(() => import('pages/auth/auth2/code-verification2')));

const AuthLogin3 = Loadable(lazy(() => import('pages/auth/auth3/login3')));

const MaintenanceError = Loadable(lazy(() => import('pages/maintenance/error/404')));
const MaintenanceError500 = Loadable(lazy(() => import('pages/maintenance/error/500')));
const MaintenanceUnderConstruction = Loadable(lazy(() => import('pages/maintenance/under-construction/under-construction')));
const MaintenanceUnderConstruction2 = Loadable(lazy(() => import('pages/maintenance/under-construction/under-construction2')));
const MaintenanceComingSoon = Loadable(lazy(() => import('pages/maintenance/coming-soon/coming-soon')));
const MaintenanceComingSoon2 = Loadable(lazy(() => import('pages/maintenance/coming-soon/coming-soon2')));

// render - sample page
const SamplePage = Loadable(lazy(() => import('pages/extra-pages/sample-page')));
const PricingPage = Loadable(lazy(() => import('pages/extra-pages/price/price1')));
const PricingPage2 = Loadable(lazy(() => import('pages/extra-pages/price/price2')));

// ==============================|| MAIN ROUTES ||============================== //

const MainRoutes = {
  path: '/',
  children: [
    {
      path: '/',
      element: <DashboardLayout />,
      children: [
        {
          path: 'apps',
          children: [
            {
              path: 'chat',
              element: <AppChat />
            },
            {
              path: 'calendar',
              element: <AppCalendar />
            },
            {
              path: 'kanban',
              element: <AppKanban />,
              children: [
                {
                  path: 'backlogs',
                  element: <AppKanbanBacklogs />
                },
                {
                  path: 'board',
                  element: <AppKanbanBoard />
                }
              ]
            },
            {
              path: 'customer',
              children: [
                {
                  path: 'customer-list',
                  element: <AppCustomerList />
                },
                {
                  path: 'customer-card',
                  element: <AppCustomerCard />
                }
              ]
            },
            {
              path: 'invoice',
              children: [
                {
                  path: 'dashboard',
                  element: <AppInvoiceDashboard />
                },
                {
                  path: 'create',
                  element: <AppInvoiceCreate />
                },
                {
                  path: 'details/:id',
                  element: <AppInvoiceDetails />
                },
                {
                  path: 'edit/:id',
                  element: <AppInvoiceEdit />
                },
                {
                  path: 'list',
                  element: <AppInvoiceList />
                }
              ]
            },
            {
              path: 'profiles',
              children: [
                {
                  path: 'account',
                  element: <AccountProfile />,
                  children: [
                    {
                      path: 'basic',
                      element: <AccountTabProfile />
                    },
                    {
                      path: 'personal',
                      element: <AccountTabPersonal />
                    },
                    // {
                    //   path: 'my-account',
                    //   element: <AccountTabAccount />
                    // },
                    {
                      path: 'password',
                      element: <AccountTabPassword />
                    },
                    // {
                    //   path: 'role',
                    //   element: <AccountTabRole />
                    // },
                    {
                      path: 'settings',
                      element: <AccountTabSettings />
                    }
                  ]
                },
                {
                  path: 'user',
                  element: <UserProfile />,
                  children: [
                    {
                      path: 'personal',
                      element: <UserTabPersonal />
                    },
                    {
                      path: 'payment',
                      element: <UserTabPayment />
                    },
                    {
                      path: 'password',
                      element: <UserTabPassword />
                    },
                    {
                      path: 'settings',
                      element: <UserTabSettings />
                    }
                  ]
                }
              ]
            },
            {
              path: 'e-commerce',
              children: [
                {
                  path: 'products',
                  element: <AppECommProducts />,
                  loader: productsLoader,
                  errorElement: <ErrorBoundary />
                },
                {
                  path: 'product-details/:id',
                  element: <AppECommProductDetails />,
                  loader: productLoader,
                  errorElement: <ErrorBoundary />
                },
                {
                  path: 'product-list',
                  element: <AppECommProductList />,
                  loader: productsLoader,
                  errorElement: <ErrorBoundary />
                },
                {
                  path: 'add-new-product',
                  element: <AppECommAddProduct />
                },
                {
                  path: 'checkout',
                  element: <AppECommCheckout />
                }
              ]
            }
          ]
        },
        {
          path: 'forms',
          children: [
            {
              path: 'services',
              element: <FormServices />
            },
            {
              path: 'jobs',
              element: <FormJobs />
            },
            {
              path: 'blog',
              element: <FormBlog />
            },
            {
              path: 'work',
              element: <FormWork />
            },
            {
              path: 'team',
              element: <FormTeam />
            },
            {
              path: 'special-offer',
              element: <FormSpecialOffer />
            },
            {
              path: 'testimonials',
              element: <FormTestimonials />
            },
            {
              path: 'social-media',
              element: <FormSocialMedia />
            },
            {
              path: 'before-after',
              element: <FormBeforeAfter />
            },
            {
              path: 'gallery-media',
              element: <FormGalleryMedia />
            },
            {
              path: 'edit',
              children: [
                {
                  path: 'blog/:id',
                  element: <FormEditBlog />
                },
                {
                  path: 'jobs/:id',
                  element: <FormEditJobs />
                },
                {
                  path: 'team/:id',
                  element: <FormEditTeam />
                },
                {
                  path: 'works/:id',
                  element: <FormEditWorks />
                },
                {
                  path: 'services/:id',
                  element: <FormEditServices />
                },
                {
                  path: 'social-media/:id',
                  element: <FormEditSocialMedia />
                },
                {
                  path: 'before-after/:id',
                  element: <FormEditBeforeAfter />
                },
                {
                  path: 'gallery-media/:id',
                  element: <FormEditGalleryMedia />
                }
              ]
            }
          ]
        },
        {
          path: 'tables',
          children: [
            {
              path: 'services',
              element: <ReactTableServices />
            },
            {
              path: 'jobs',
              element: <ReactTableJobs />
            },
            {
              path: 'team',
              element: <ReactTableTeam />
            },
            {
              path: 'team-sorting',
              element: <ReactTableTeam />
            },
            {
              path: 'blogs',
              element: <ReactTableBlogs />
            },
            {
              path: 'works',
              element: <ReactTableWorks />
            },
            {
              path: 'testimonials',
              element: <ReactTableTestimonials />
            },
            {
              path: 'social-media',
              element: <ReactTableSocialMedia />
            },
            {
              path: 'before-after',
              element: <ReactTableBeforeAfter />
            },
            {
              path: 'gallery-media',
              element: <ReactTableGalleryMedia />
            }
          ]
        },
        {
          path: 'team',
          children: [
            {
              path: ':id',
              element: <TeamMemberDetail />
            }
          ]
        },
        {
          path: 'charts',
          children: [
            {
              path: 'apexchart',
              element: <ChartApexchart />
            },
            {
              path: 'org-chart',
              element: <ChartOrganization />
            }
          ]
        },
        {
          path: 'map',
          element: <Map />
        },
        {
          path: 'sample-page',
          element: <SamplePage />
        },
        {
          path: 'price',
          children: [
            {
              path: 'price1',
              element: <PricingPage />
            },
            {
              path: 'price2',
              element: <PricingPage2 />
            }
          ]
        }
      ]
    },
    {
      path: '/maintenance',
      element: <PagesLayout />,
      children: [
        {
          path: '404',
          element: <MaintenanceError />
        },
        {
          path: '500',
          element: <MaintenanceError500 />
        },
        {
          path: 'under-construction',
          element: <MaintenanceUnderConstruction />
        },
        {
          path: 'under-construction2',
          element: <MaintenanceUnderConstruction2 />
        },
        {
          path: 'coming-soon',
          element: <MaintenanceComingSoon />
        },
        {
          path: 'coming-soon2',
          element: <MaintenanceComingSoon2 />
        }
      ]
    },
    {
      path: '/auth',
      element: <PagesLayout />,
      children: [
        {
          path: 'login',
          element: <AuthLogin />
        },
        {
          path: 'register',
          element: <AuthRegister />
        },
        {
          path: 'forgot-password',
          element: <AuthForgotPassword />
        },
        {
          path: 'reset-password',
          element: <AuthResetPassword />
        },
        {
          path: 'check-mail',
          element: <AuthCheckMail />
        },
        {
          path: 'code-verification',
          element: <AuthCodeVerification />
        },
        {
          path: 'login2',
          element: <AuthLogin2 />
        },
        {
          path: 'register2',
          element: <AuthRegister2 />
        },
        {
          path: 'forgot-password2',
          element: <AuthForgotPassword2 />
        },
        {
          path: 'reset-password2',
          element: <AuthResetPassword2 />
        },
        {
          path: 'check-mail2',
          element: <AuthCheckMail2 />
        },
        {
          path: 'code-verification2',
          element: <AuthCodeVerification2 />
        },
        {
          path: 'login3',
          element: <AuthLogin3 />
        }
      ]
    },
    {
      path: '*',
      element: <MaintenanceError />
    }
  ]
};

export default MainRoutes;

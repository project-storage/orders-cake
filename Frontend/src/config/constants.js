// System Constants
export const SYSTEM_NAME = 'ระบบสั่งจองเค้กออนไลน์ '
export const FOOTTER = "DevelopedBy. สาขาเทคโนโลยีสารสนเทศ"

// Authentication
export const LOGIN_PATH = '/'
export const REGISTER_PATH = '/register'

// Backend Page Title
export const DASHBOARD_TITLE = 'Dashboard'
export const PRODUCT_TITLE = 'Product'
export const REPORT_TITLE = 'Report'
export const SETTING_TITLE = 'Setting'

// Backend Routes
const BASE_SUPERADMIN_PATH = '/superAdmin/'
export const DASHBOARD_PATH = BASE_SUPERADMIN_PATH + 'dashboard'
export const PRODUCT_PATH = BASE_SUPERADMIN_PATH + 'products'
export const STUDENT_PATH = BASE_SUPERADMIN_PATH + 'students'
export const TEACHER_PATH = BASE_SUPERADMIN_PATH + 'teachers'
export const USER_PATH = BASE_SUPERADMIN_PATH + 'users'
export const VIEWDATA_PATH = BASE_SUPERADMIN_PATH + 'viewdata'
export const MANAGE_PATH = BASE_SUPERADMIN_PATH + 'manage'
export const DEPARTMENT_PATH = BASE_SUPERADMIN_PATH + 'department'
export const DEGREE_PATH = BASE_SUPERADMIN_PATH + 'degree'
export const ADMIN_PATH = BASE_SUPERADMIN_PATH + 'admins'
export const DEPART_FINANECE_PATH = BASE_SUPERADMIN_PATH + 'depart-finances'
export const DEPART_CAKE_PATH = BASE_SUPERADMIN_PATH + 'depart-dake'
export const DEPART_PRODUCT_CAKE_PATH = BASE_SUPERADMIN_PATH + 'depart-product-cake'
export const TEAM_PATH = BASE_SUPERADMIN_PATH + 'teams'
export const SINGLE_PATH = BASE_SUPERADMIN_PATH + 'singles'
export const PROFILE_SUPERADMIN_PATH = BASE_SUPERADMIN_PATH + 'profile-superAdmin'

const BASEADMIN_PATH = '/admin/'
export const ORDERALL_ADMINPATH = BASEADMIN_PATH + 'orders'
export const SETTING_ADMINPATH = BASEADMIN_PATH + 'settingadmin'

const BASE_TEACHER_PATH = '/teacher/'
export const PROFILE_TEACHER_PATH = BASE_TEACHER_PATH + 'profile-superAdmin'
export const DASHBOARDTEACH_PATH = BASE_TEACHER_PATH + 'dashboard'
export const ROOM_TEACHERPATH = BASE_TEACHER_PATH + 'rooms'
export const ROOMSTU_TEACHERPATH = BASE_TEACHER_PATH + 'roomstu'
export const ORDERSTU_TEACHERPATH = BASE_TEACHER_PATH + 'orderstu'

const BASEFINANCE_PATH = '/finance/'
export const ORDER_FINANCEPATH = BASEFINANCE_PATH + 'orders'

const BASEGIVING_PATH = '/giving/'
export const ORDER_GIVINGPATH = BASEGIVING_PATH + 'orders'

// User Routes
const BASE_USER = '/user/'
export const DASHBOARD_USER = BASE_USER + 'dashboard'
export const PRODUCT_USER = BASE_USER + 'product'
export const REPORT_USER = BASE_USER + 'report'
// System Constants
export const SYSTEM_NAME = 'ระบบสั่งจองเค้ก'
export const FOOTTER = "DevelopedBy. สาขาเทคโนโลยีสารสนเทศ"

// Authentication
export const LOGIN_PATH = '/'
export const REGISTER_PATH = '/register'

// Backend Routes
const BASE_SUPERADMIN_PATH = '/superAdmin/'
export const DASHBOARD_PATH = BASE_SUPERADMIN_PATH + 'dashboard'
export const PROFILE_SUPERADMIN_PATH = BASE_SUPERADMIN_PATH + 'profile-superAdmin'
export const ALL_DATA_USER_PATH = BASE_SUPERADMIN_PATH + 'user/all'
export const DETAIL_USER_DATA_PATH = BASE_SUPERADMIN_PATH + 'user/detail'
export const CREATE_USER_PATH = BASE_SUPERADMIN_PATH + 'user/create'
// path user
export const ADMIN_PATH = BASE_SUPERADMIN_PATH + 'admins'
export const UPDATE_ADMIN_PATH = BASE_SUPERADMIN_PATH + 'user/update/admins'
export const DEPART_CAKE_PATH = BASE_SUPERADMIN_PATH + 'depart-cake'
export const DEPART_FINANCE_PATH = BASE_SUPERADMIN_PATH + 'depart-finance'
export const DEPART_PRODUCT_CAKE_PATH = BASE_SUPERADMIN_PATH + 'depart-product-cake'
export const STUDENT_PATH = BASE_SUPERADMIN_PATH + 'students'
export const TEACHER_PATH = BASE_SUPERADMIN_PATH + 'user/teachers'
export const TEAM_PATH = BASE_SUPERADMIN_PATH + 'teams'
export const SINGLE_PATH = BASE_SUPERADMIN_PATH + 'singel'
export const USER_PATH = BASE_SUPERADMIN_PATH + 'users'
// path data all 
export const PRODUCT_PATH = BASE_SUPERADMIN_PATH + 'cakes'
export const UPDATE_CAKEA_PATH = BASE_SUPERADMIN_PATH + 'update/cakes'
export const DEPARTMENT_PATH = BASE_SUPERADMIN_PATH + 'department'
export const UPDATE_DEPARTMENT_PATH = BASE_SUPERADMIN_PATH + 'department/update'
export const DEGREE_PATH = BASE_SUPERADMIN_PATH + 'degree'
export const UPDATE_DEGREE_PATH = BASE_SUPERADMIN_PATH + 'degree/update'

const BASEADMIN_PATH = '/admin/'
export const ORDERALL_ADMINPATH = BASEADMIN_PATH + 'orders'
export const SETTING_ADMINPATH = BASEADMIN_PATH + 'settingadmin'

const BASE_TEACHER_PATH = '/teacher/'
export const PROFILE_TEACHER_PATH = BASE_TEACHER_PATH + 'profile'
export const STUDENT_TEACHER_PATH = BASE_TEACHER_PATH + 'student'
export const GROUP_TEACHER_PATH = BASE_TEACHER_PATH + 'teacher-group'
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
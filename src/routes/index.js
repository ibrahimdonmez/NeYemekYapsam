// We only need to import the modules necessary for initial render
import CoreLayout from '../layouts/CoreLayout';
import PublicLayout from '../layouts/PublicLayout';
import PrivateLayout from '../layouts/PrivateLayout';
import Home from './Home'
import Admin from './Admin/Admin';
import AboutUs from './Pages/AboutUs';
import Foods from './Pages/Foods';
import SearchFood from './Pages/SearchFood';
import Contact from './Pages/Contact'
import Users from './Pages/Users';
import AddFood from './Pages/AddFood';
import AddFoodMaterial from './Pages/AddFoodMaterial';
import FoodList from './Pages/FoodList';
import FoodDetail from './Pages/FoodDetail';
import FeedBacks from './Pages/FeedBacks';
import FoodMaterials from './Pages/FoodMaterials';

export const createRoutes = (store) => ({
  component   : CoreLayout,
  childRoutes : [
    {
      path        : '/',
      component : PublicLayout,
      indexRoute  : Home,
      childRoutes : [
        {
          path : "/hakkimizda",
          component : AboutUs
        },
        {
          path : "/YemekAra",
          component : SearchFood
        },
        {
          path : "/YemekListesi",
          component : FoodList,
        },
        {
          path : "/iletisim",
          component : Contact
        },
        {
          path : "/YemekDetayi",
          component : FoodDetail
        }
      ]
    },
    {
      path: '/Admin',
      component : PrivateLayout,
      indexRoute : {
        component : Admin
      },
      childRoutes : [
        {
          path : "/Admin/hakkimizda",
          component : AboutUs
        },
        {
          path : "/Admin/YemekAra",
          component : SearchFood
        },
        {
          path : "/Admin/Yemekler",
          component : Foods
        },
        {
          path : "/Admin/YemekListesi",
          component : FoodList
        },
        {
          path : "/Admin/iletisim",
          component : Contact
        },
        {
          path : "/Admin/Kullanicilar",
          component : Users
        },
        {
          path : "/Admin/YemekEkle",
          component : AddFood
        },
        {
          path : "/Admin/YemekMalzemesiEkle",
          component : AddFoodMaterial
        },
        {
          path : "/Admin/YemekDetayi",
          component : FoodDetail
        },
        {
          path : "/Admin/GeriBildirimler",
          component : FeedBacks
        },
        {
          path : "/Admin/YemekMalzemeleri",
          component : FoodMaterials
        }
      ]
    }
  ]
})

export default createRoutes
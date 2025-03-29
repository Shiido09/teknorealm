import { StyleSheet, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

export const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#333',
  },
  logoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logoPlaceholder: {
    width: 36,
    height: 36,
    borderRadius: 8,
    backgroundColor: '#333',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
  },
  logoText: {
    color: '#FFF',
    fontSize: 16,
  },
  headerTitle: {
    fontSize: 18,
  },
  headerActions: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconButton: {
    padding: 8,
    marginLeft: 4,
  },
  authButtons: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerButton: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 4,
    marginLeft: 8,
  },
  headerButtonText: {
    fontWeight: '500',
  },
  scrollView: {
    flex: 1,
  },
  container: {
    flex: 1,
    padding: 16,
  },
  heroSection: {
    alignItems: 'center',
    marginVertical: 24,
    paddingHorizontal: 16,
  },
  heroLogoContainer: {
    marginBottom: 20,
  },
  heroLogo: {
    width: 80,
    height: 80,
    borderRadius: 16,
    backgroundColor: '#333',
    justifyContent: 'center',
    alignItems: 'center',
  },
  heroLogoText: {
    color: '#FFF',
    fontSize: 32,
    fontWeight: 'bold',
  },
  title: {
    fontSize: 32,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    textAlign: 'center',
    marginTop: 8,
    marginBottom: 24,
    paddingHorizontal: 24,
  },
  heroButton: {
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 8,
    marginTop: 8,
  },
  buttonText: {
    color: 'white',
    fontWeight: '600',
    fontSize: 16,
  },
  sectionContainer: {
    marginVertical: 20,
  },
  sectionTitle: {
    marginBottom: 16,
    paddingHorizontal: 8,
  },
  categoriesContainer: {
    flexDirection: 'row',
    paddingVertical: 8,
  },
  categoryButton: {
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginHorizontal: 8,
    borderWidth: 1,
    minWidth: 120,
    alignItems: 'center',
  },
  categoryText: {
    fontWeight: '500',
  },
  productsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  productCard: {
    width: width > 500 ? '31%' : '48%',
    marginBottom: 20,
    borderRadius: 8,
    padding: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  productImagePlaceholder: {
    width: '100%',
    height: 120,
    backgroundColor: '#555',
    borderRadius: 6,
    marginBottom: 12,
  },
  productTitle: {
    marginBottom: 4,
  },
  productPrice: {
    marginBottom: 12,
    fontWeight: '700',
  },
  addToCartButton: {
    paddingVertical: 8,
    borderRadius: 4,
    alignItems: 'center',
  },
  specialOfferCard: {
    padding: 20,
    borderRadius: 8,
    marginHorizontal: 8,
  },
  offerTitle: {
    marginBottom: 8,
    fontSize: 18,
  },
  offerDescription: {
    marginBottom: 16,
  },
  offerButton: {
    paddingVertical: 10,
    alignItems: 'center',
    borderRadius: 4,
    borderWidth: 1,
  },
  footer: {
    marginTop: 40,
    paddingTop: 20,
    borderTopWidth: 1,
    borderTopColor: '#333',
    alignItems: 'center',
  },
  footerText: {
    marginBottom: 16,
    fontSize: 14,
    color: '#888',
  },
  footerLinks: {
    flexDirection: 'row',
    justifyContent: 'center',
    flexWrap: 'wrap',
  },
  footerLink: {
    marginHorizontal: 12,
    marginBottom: 8,
    fontSize: 14,
    color: '#666',
  },
  bottomNavBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    borderTopWidth: 1,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  navButton: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 6,
  },
  navButtonText: {
    fontSize: 12,
    marginTop: 4,
  },
});

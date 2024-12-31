import { StyleSheet, View, Text, ScrollView, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function Budget() {
  return (
    <View style={styles.container}>
      {/* Header Card */}
      <View style={styles.headerCard}>
        <Text style={styles.headerTitle}>Total Balance</Text>
        <Text style={styles.balanceAmount}>$2,450.00</Text>
        <View style={styles.periodSelector}>
          <Text style={styles.periodText}>This Month</Text>
          <Ionicons name="chevron-down" size={20} color="#e2e3f7" />
        </View>
      </View>

      {/* Quick Actions */}
      <View style={styles.quickActions}>
        <Pressable style={styles.actionButton}>
          <View style={styles.actionIcon}>
            <Ionicons name="add-circle" size={24} color="#555cb3" />
          </View>
          <Text style={styles.actionText}>Add Income</Text>
        </Pressable>
        <Pressable style={styles.actionButton}>
          <View style={styles.actionIcon}>
            <Ionicons name="remove-circle" size={24} color="#555cb3" />
          </View>
          <Text style={styles.actionText}>Add Expense</Text>
        </Pressable>
      </View>

      {/* Recent Transactions */}
      <View style={styles.transactionsContainer}>
        <Text style={styles.sectionTitle}>Recent Transactions</Text>
        <ScrollView style={styles.transactionsList}>
          {/* Sample transactions */}
          <TransactionItem 
            title="Grocery Shopping"
            amount="-$85.00"
            date="Today"
            icon="cart"
            type="expense"
          />
          <TransactionItem 
            title="Salary Deposit"
            amount="+$2,800.00"
            date="Yesterday"
            icon="cash"
            type="income"
          />
          <TransactionItem 
            title="Netflix Subscription"
            amount="-$15.99"
            date="Mar 15"
            icon="play-circle"
            type="expense"
          />
        </ScrollView>
      </View>
    </View>
  );
}

// Transaction Item Component
interface TransactionItemProps {
  title: string;
  amount: string;
  date: string;
  icon: keyof typeof Ionicons.glyphMap;
  type: 'income' | 'expense';
}

function TransactionItem({ title, amount, date, icon, type }: TransactionItemProps) {
  return (
    <View style={styles.transactionItem}>
      <View style={styles.transactionIcon}>
        <Ionicons name={icon} size={24} color="#555cb3" />
      </View>
      <View style={styles.transactionDetails}>
        <Text style={styles.transactionTitle}>{title}</Text>
        <Text style={styles.transactionDate}>{date}</Text>
      </View>
      <Text style={[
        styles.transactionAmount,
        { color: type === 'income' ? '#4CAF50' : '#FF5252' }
      ]}>
        {amount}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e2e3f7',
  },
  headerCard: {
    backgroundColor: '#555cb3',
    padding: 20,
    borderBottomLeftRadius: 25,
    borderBottomRightRadius: 25,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  headerTitle: {
    color: '#e2e3f7',
    fontSize: 16,
    fontWeight: '500',
  },
  balanceAmount: {
    color: '#e2e3f7',
    fontSize: 36,
    fontWeight: 'bold',
    marginVertical: 10,
  },
  periodSelector: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  periodText: {
    color: '#e2e3f7',
    marginRight: 5,
  },
  quickActions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 20,
  },
  actionButton: {
    alignItems: 'center',
  },
  actionIcon: {
    backgroundColor: '#f5c116',
    padding: 12,
    borderRadius: 12,
    marginBottom: 8,
  },
  actionText: {
    color: '#555cb3',
    fontSize: 14,
    fontWeight: '500',
  },
  transactionsContainer: {
    flex: 1,
    padding: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#555cb3',
    marginBottom: 15,
  },
  transactionsList: {
    flex: 1,
  },
  transactionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 12,
    marginBottom: 10,
  },
  transactionIcon: {
    backgroundColor: '#e2e3f7',
    padding: 10,
    borderRadius: 10,
    marginRight: 15,
  },
  transactionDetails: {
    flex: 1,
  },
  transactionTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: '#555cb3',
  },
  transactionDate: {
    fontSize: 14,
    color: '#888',
    marginTop: 4,
  },
  transactionAmount: {
    fontSize: 16,
    fontWeight: '600',
  },
});

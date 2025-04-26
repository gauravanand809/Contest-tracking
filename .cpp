#include <bits/stdc++.h>
#include <ext/pb_ds/assoc_container.hpp>
using namespace __gnu_pbds;
using namespace std;

#define ll long long
#define sor(v) sort(v.begin(), v.end())
#define vec vector<ll>
#define stk stack<ll>
#define all(z) z.begin(),z.end()
#define que queue<ll>
#define pq priority_queue<ll>
#define mp map<ll, ll>
#define st set<ll>
#define us unordered_set<ll>
#define ump unordered_map<ll, ll>

// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
ll bs(const vec& arr, ll target) { ll left = 0, right = arr.size() - 1; while (left <= right) { ll mid = left + (right - left) / 2; if (arr[mid] == target) return mid; if (arr[mid] < target) left = mid + 1; else right = mid - 1; } return -1; }
bool comp(const pair<ll, ll>& a, const pair<ll, ll>& b) { return a.first > b.first; }
void prefix_Sum(vec& a) { for (ll i = 1; i < a.size(); ++i) a[i] += a[i - 1]; }
void prefix_2sum(vector<vec>& b) { ll n = b.size(), m = b[0].size(); for (ll i = 0; i < n; ++i) { for (ll j = 0; j < m; ++j) { if (i > 0) b[i][j] += b[i - 1][j]; if (j > 0) b[i][j] += b[i][j - 1]; if (i > 0 && j > 0) b[i][j] -= b[i - 1][j - 1]; } } }
ll binpow(ll b, ll p, ll mod) { ll ans = 1; b %= mod; for (; p; p >>= 1) { if (p & 1) ans = ans * b % mod; b = b * b % mod; } return ans; }
ll MOD = 1000000000 + 7; vector<ll> fact(1000001), ifact(1000001);
void factorial() { fact[0] = 1; for (ll i = 1; i < 1000001; i++) fact[i] = fact[i - 1] * i % MOD; }
void inverse_factorial() { ifact[1000000] = binpow(fact[1000000], MOD - 2, MOD); for (ll i = 1000000 - 1; i >= 0; i--) ifact[i] = ifact[i + 1] * (i + 1) % MOD; }
void debug(vec p){ll n = p.size();for(ll i=0;i<n;i++){cout<<p[i]<<" ";}cout<<"\n";}
// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
class DSU {
    vector<int> parent, rank;
public:
    DSU(int n) : parent(n), rank(n, 0) { iota(parent.begin(), parent.end(), 0); }
    int find(int x) { return parent[x] = (parent[x] == x ? x : find(parent[x])); }
    bool unite(int x, int y) { return ((x = find(x)) == (y = find(y))) ? false : ((rank[x] < rank[y] ? parent[x] = y : parent[y] = x) == 0 && (rank[x] += (rank[x] == rank[y]))); }
    bool isSameSet(int x, int y) { return find(x) == find(y); }
};
// --------------------------------------------------------------------------
vec reconstructLIS(const vec &nums, const vec &prev_idx, const vec &tail_indices) {
    vec lis; for (int k = tail_indices.back(); k != -1; k = prev_idx[k]) lis.push_back(nums[k]);
    reverse(lis.begin(), lis.end()); return lis;
}
vec lps(const vec &nums) {
    if (nums.empty()) return {};
    int n = nums.size();
    vec tails, prev_idx(n, -1), tail_indices;
    for (int i = 0; i < n; ++i) {
        auto it = lower_bound(tails.begin(), tails.end(), nums[i]);
        int pos = it - tails.begin();
        if (it == tails.end()) tails.push_back(nums[i]), tail_indices.push_back(i);
        else *it = nums[i], tail_indices[pos] = i;
        if (pos > 0) prev_idx[i] = tail_indices[pos - 1];
    }
    return reconstructLIS(nums, prev_idx, tail_indices);
}
// --------------------------------------------------------------------------
class OrderedSet {
public:
    tree<int, null_type, less<int>, rb_tree_tag, tree_order_statistics_node_update> orderedSet;
    void insert(int value) { orderedSet.insert(value); }
    void erase(int value) { orderedSet.erase(value); }
    int find_by_order(int k) { return *orderedSet.find_by_order(k); }
    int order_of_key(int value) { return orderedSet.order_of_key(value); }
};
// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

void solve() {

}

int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);
    ll t; cin >> t;
    while (t--) {
        solve();
    }
    return 0;
}
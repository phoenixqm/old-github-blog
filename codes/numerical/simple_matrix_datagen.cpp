#include <iostream>
#include <fstream>
#include <cstdlib>
#include <ctime>
#include <climits>
using namespace std;

const int maxL = 2048;

double A[maxL][maxL];
double B[maxL][maxL];
double R[maxL][maxL];

int a_nrow, a_ncol;
int b_nrow, b_ncol;

int main(int argc, char** argv) {

    srand(time(0));

    ofstream out("datain.txt");
    if (argc == 4) {
        a_nrow = atoi(argv[1]);
        a_ncol = b_nrow = atoi(argv[2]);
        b_ncol = atoi(argv[3]);
        if (a_nrow > 2048 || a_ncol > 2048 || b_ncol > 2048) {
            cout << "too large row,col, exit" << endl;
            return 0;
        }
        cout << "gen using input row,col" << endl;
    } else {
        a_nrow = rand()%maxL + 1;
        a_ncol = b_nrow = rand()%maxL + 1;
        b_ncol = rand()%maxL + 1;
        cout << "gen using random row,col" << endl;
    }


    out << a_nrow << " " << a_ncol << endl;
    for (int i = 0; i < a_nrow; i++) {
        for (int j = 0; j < a_ncol; j++) {
            out << (double)rand()/INT_MAX * 100 << " ";
        }
        out << endl;
    }

    out << b_nrow << " " << b_ncol << endl;
    for (int i = 0; i < b_nrow; i++) {
        for (int j = 0; j < b_ncol; j++) {
            out << (double)rand()/INT_MAX * 100 << " ";
        }
        out << endl;
    }


}
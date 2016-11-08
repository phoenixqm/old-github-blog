#include <iostream>
#include <fstream>

using namespace std;

const int maxL = 2048;

double A[maxL][maxL];
double B[maxL][maxL];
double R[maxL][maxL];

int a_nrow, a_ncol;
int b_nrow, b_ncol;

int main(int argc, char** argv) {

    ifstream in("datain.txt");
    ofstream out("dataout.txt");
    in >> a_nrow >> a_ncol;
    for (int i = 0; i < a_nrow; i++) {
        for (int j = 0; j < a_ncol; j++) {
            in >> A[i][j];
        }
    }

    in >> b_nrow >> b_ncol;
    for (int i = 0; i < b_nrow; i++) {
        for (int j = 0; j < b_ncol; j++) {
            in >> B[i][j];
        }
    }

    if (a_ncol != b_nrow) {
        cout << "can not multiply" << endl;
    }

    for (int i = 0; i < a_nrow; i++) {
        for (int j = 0; j < b_ncol; j++) {
            double s = 0.0;
            for (int k = 0; k < a_ncol; k++) {
                s += A[i][k]*B[k][j];
            }
            R[i][j] = s;
        }
    }

    out << a_nrow << " " << b_ncol << endl;
    for (int i = 0; i < a_nrow; i++) {
        for (int j = 0; j < b_ncol - 1; j++) {
            out << R[i][j] << " ";
        }
        out << R[i][b_ncol - 1] << endl;
    }

}